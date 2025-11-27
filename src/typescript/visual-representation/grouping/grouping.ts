class ProductService {

    async fetchProductFromAPI(id: number): Promise<Product | undefined> {
        try {
            const response = await fetch(`${this.apiUrl}/products/${id}`);
            const product: Product = await response.json();
            this.products.push(product);
            console.log(`Fetched product from API: ${product.name}`);
            return product;
        } catch (error) {
            console.error('Error fetching product from API:', error);
            return undefined;
        }
    }

    private apiUrl: string = 'https://api.example.com';


    deleteProduct(id: number): void {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1)[0];
            console.log(`Product "${deletedProduct.name}" with ID ${id} deleted.`);
        } else {
            console.log(`Product with ID ${id} not found.`);
        }
    }

    private products: Product[] = [];


    createProduct(name: string, price: number): Product {
        const newProduct: Product = {
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


    logProductDetails(id: number): void {
        const product = this.products.find(p => p.id === id);
        if (product) {
            console.log(`ID: ${product.id}, Name: ${product.name}, Price: $${product.price}, Created At: ${product.createdAt}`);
        } else {
            console.log(`Product with ID ${id} not found.`);
        }
    }


    getAllProducts(): Product[] {
        // Randomly using apiUrl in a retrieval method
        fetch(`${this.apiUrl}/products`)
            .then(response => response.json())
            .then(data => {
                this.products = data;
                console.log('Products fetched from API:', data);
            })
            .catch(error => console.error('Error fetching products from API:', error));

        return this.products;
    }


    getProductById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }


    updatePrice(id: number, newPrice: number): Product | undefined {
        const product = this.getProductById(id);
        if (product) {
            product.price = newPrice;
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
        }
        console.log(`Product ID ${id} not found.`);
        return undefined;
    }

    private generateId(): number {
        return this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    }
}


interface Product {
    id: number;
    name: string;
    price: number;
    createdAt: Date;
}

const productService = new ProductService();

productService.createProduct('Tablet', 300);
productService.updatePrice(1, 350);
productService.logProductDetails(1);
productService.deleteProduct(1);
console.log(productService.getAllProducts());
productService.fetchProductFromAPI(2);
\ No newline at end of file