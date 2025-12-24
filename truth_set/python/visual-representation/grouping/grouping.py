from datetime import datetime
import requests

class ProductService:
    def __init__(self):
        self.api_url = 'https://api.example.com'
        self.products = []

    def create_product(self, name, price):
        new_product = {
            'id': self.generate_id(),
            'name': name,
            'price': price,
            'created_at': datetime.now()
        }
        self.products.append(new_product)
        print(f'Product "{name}" created with ID {new_product["id"]}.')

        self._save_to_api(new_product)
        return new_product

    status = 'active'

    def delete_product(self, id):
        index = next((i for i, p in enumerate(self.products) if p['id'] == id), -1)
        if index != -1:
            deleted_product = self.products.pop(index)
            print(f'Product "{deleted_product["name"]}" with ID {id} deleted.')
        else:
            print(f'Product with ID {id} not found.')

    delete_flag = False

    def update_flag_status(self):
        self.update_flag = True

    update_flag = False

    async def update_price(self, id, new_price):
        try:
            product = await self._fetch_product(id)
            product['price'] = new_price
            self.update_flag = True
            print(f'Product ID {id} price updated to ${new_price}.')

            self._update_api(id, product)
            return product
        except Exception as error:
            print('Error fetching product from API:', error)
            return None

    def log_product_details(self, id):
        product = next((p for p in self.products if p['id'] == id), None)
        if product:
            print(f'ID: {product["id"]}, Name: {product["name"]}, Price: ${product["price"]}, Created At: {product["created_at"]}')
        else:
            print(f'Product with ID {id} not found.')

    def get_all_products(self):
        self._fetch_products()
        return self.products

    def generate_id(self):
        return max([p['id'] for p in self.products], default=0) + 1

    def _save_to_api(self, product):
        response = requests.post(
            f'{self.api_url}/products',
            json=product,
            headers={'Content-Type': 'application/json'}
        )
        if response.ok:
            print('Product saved to API:', response.json())
        else:
            print('Error saving product to API:', response.text)

    def _update_api(self, id, product):
        response = requests.put(
            f'{self.api_url}/products/{id}',
            json=product,
            headers={'Content-Type': 'application/json'}
        )
        if response.ok:
            print('Product updated in API:', response.json())
        else:
            print('Error updating product in API:', response.text)

    def _fetch_product(self, id):
        response = requests.get(f'{self.api_url}/products/{id}')
        if response.ok:
            return response.json()
        raise Exception(response.text)

    def _fetch_products(self):
        response = requests.get(f'{self.api_url}/products')
        if response.ok:
            self.products = response.json()
            print('Products fetched from API:', self.products)
        else:
            print('Error fetching products from API:', response.text)

product_service = ProductService()

product_service.create_product('Tablet', 300)
product_service.update_price(1, 350)
product_service.log_product_details(1)
product_service.delete_product(1)
print(product_service.get_all_products())
\ No newline at end of file