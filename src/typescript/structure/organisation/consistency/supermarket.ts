class UserService {
    fetchUserProfile(userId: number): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`User Profile for ID: ${userId}`);
            }, 1000);
        });
    }

    checkUserEligibility(age: number): boolean {
        return age >= 18;
    }
}

class ProductService {
    retrieveProductDetail(productId: number): string {
        const products: { [key: number]: string } = {
            101: "Laptop",
            102: "Smartphone",
            103: "Headphones",
        };
        return products[productId] || "Product Not Found";
    }

    validateProductStock(stock: number): boolean {
        return stock > 0;
    }
}

class OrderService {
    getOrderInfo(orderId: number): string {
        const orders: { [key: number]: string } = {
            5001: "Order #5001: Shipped",
            5002: "Order #5002: Processing",
            5003: "Order #5003: Delivered",
        };
        return orders[orderId] || "Order Not Found";
    }

    isOrderComplete(completed: boolean): boolean {
        return completed;
    }
}


const userService = new UserService();
userService.fetchUserProfile(1).then(profile => console.log(profile));
console.log(userService.checkUserEligibility(20));

const productService = new ProductService();
console.log(productService.retrieveProductDetail(101));
console.log(productService.validateProductStock(0));

const orderService = new OrderService();
console.log(orderService.getOrderInfo(5002));
console.log(orderService.isOrderComplete(true));
\ No newline at end of file