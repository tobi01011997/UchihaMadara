class OrderService {
    private orders: Order[] = [];

    placeOrder(order: Order): void {
        this.orders.push(order);
        this.notify(`Order placed: ${order.id}`);
    }

    cancelOrder(orderId: number): void {
        this.orders = this.orders.filter(order => order.id !== orderId);
        this.notify(`Order canceled: ${orderId}`);
    }

    private notify(message: string): void {
        console.log(`Notification: ${message}`);
    }
}

interface Order {
    id: number;
    product: string;
    quantity: number;
}
\ No newline at end of file