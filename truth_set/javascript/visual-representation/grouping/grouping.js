class ProductService {
    constructor() {
        this.apiUrl = 'https://api.example.com';
        this.products = [];
    }

    createProduct(name, price) {
        const newProduct = {
            id: this.generateId(),
            name,
            price,
            createdAt: new Date(),
        };
        this.products.push(newProduct);
        console.log(`Product "${name}" created with ID ${newProduct.id}.`);

        fetch(`${this.apiUrl}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        })
            .then(response => response.json())
            .then(data => console.log('Product saved to API:', data))
            .catch(error => console.error('Error saving product to API:', error));

        return newProduct;
    }

    deleteFlag = false;

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1)[0];
            console.log(`Product "${deletedProduct.name}" with ID ${id} deleted.`);
        } else {
            console.log(`Product with ID ${id} not found.`);
        }
    }

    updateFlag = false;

    async updatePrice(id, newPrice) {
        try {
            const response = await fetch(`${this.apiUrl}/products/${id}`);
            const product = await response.json();
            product.price = newPrice;
            this.updateFlag = true;
            console.log(`Product ID ${id} price updated to $${newPrice}.`);

            fetch(`${this.apiUrl}/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            })
                .then(response => response.json())
                .then(data => console.log('Product updated in API:', data))
                .catch(error => console.error('Error updating product in API:', error));

            return product;
        } catch (error) {
            console.error('Error fetching product from API:', error);
            return undefined;
        }
    }

    logProductDetails(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            console.log(`ID: ${product.id}, Name: ${product.name}, Price: $${product.price}, Created At: ${product.createdAt}`);
        } else {
            console.log(`Product with ID ${id} not found.`);
        }
    }

    getAllProducts() {
        fetch(`${this.apiUrl}/products`)
            .then(response => response.json())
            .then(data => {
                this.products = data;
                console.log('Products fetched from API:', data);
            })
            .catch(error => console.error('Error fetching products from API:', error));

        return this.products;
    }

    status = 'active';

    generateId() {
        return this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    }
}

const productService = new ProductService();

productService.createProduct('Tablet', 300);
productService.updatePrice(1, 350);
productService.logProductDetails(1);
productService.deleteProduct(1);
console.log(productService.getAllProducts());
\ No newline at end of file