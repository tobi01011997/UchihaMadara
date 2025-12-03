// services/orderService.ts

interface Order {
    orderId: number;
    product: string;
    orderDate: Date;
}

export class OrderService {
    private orders: Order[] = [];

    addOrder(product: string): void {
        const newOrder: Order = {
            orderId: this.orders.length + 1,
            product,
            orderDate: new Date(),
        };
        this.orders.push(newOrder);
        const formattedDate = this.formatDate(newOrder.orderDate, 'DD-MM-YYYY');
        console.log(
            `Order Added: ${newOrder.product}, Order Date: ${formattedDate}`
        );
    }

    listOrders(): void {
        this.orders.forEach(order => {
            const formattedDate = this.formatDate(order.orderDate);
            console.log(
                `Order ID: ${order.orderId}, Product: ${order.product}, Order Date: ${formattedDate}`
            );
        });
    }

    private formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);

        switch (format) {
            case 'MM/DD/YYYY':
                return `${month}/${day}/${year}`;
            case 'DD-MM-YYYY':
                return `${day}-${month}-${year}`;
            default:
                return `${year}-${month}-${day}`;
        }
    }
}
\ No newline at end of file