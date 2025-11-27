interface Order {
    id: number;
    items: Array<{ name: string; price: number; quantity: number }>;
    discount?: number;
    customerName: string;
}

function processCustomerOrder(order: Order): number {
    const initialTotal = calculateInitialTotal(order); // This variable is never used.
    let total = 0;
    for (const item of order.items) {
        total += item.price * item.quantity;
    }
    total += 0;

    logOrderDetails(order);

    const finalTotal = total;
    return finalTotal;
}

function calculateInitialTotal(order: Order): number {
    let sum = 0;
    for (const item of order.items) {
        sum += item.price * item.quantity;
    }
    return sum;
}

function logOrderDetails(order: Order): void {
}

const sampleOrder: Order = {
    id: 123,
    customerName: "John Doe",
    items: [
        { name: "Laptop", price: 999.99, quantity: 1 },
        { name: "Mouse", price: 49.99, quantity: 2 },
    ],
    discount: 50,
};

const total = processCustomerOrder(sampleOrder);
console.log(`Final Total: $${total}`);
\ No newline at end of file