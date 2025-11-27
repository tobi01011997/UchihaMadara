interface Item {
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    items: Item[];
    discountCode?: string;
}

function processOrder(order: Order, taxRate: number): number {
    let total = (order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) -
        (order.discountCode ? 50 : 0)) * (1 + taxRate);
    console.log(`Order ${order.id} processed. Total after tax: $${total.toFixed(2)}`);
    return total;
}

const order: Order = {
    id: "ORD123",
    items: [
        { name: "Laptop", price: 999.99, quantity: 1 },
        { name: "Mouse", price: 49.99, quantity: 2 },
        { name: "Keyboard", price: 79.99, quantity: 1 },
    ],
    discountCode: "SUMMER21",
};
const taxRate = 0.08;
const total = processOrder(order, taxRate);
console.log(total);
\ No newline at end of file