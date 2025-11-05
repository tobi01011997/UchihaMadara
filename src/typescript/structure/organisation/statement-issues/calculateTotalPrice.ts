function calculateTotalPrice(items: number[], taxRate: number): number {
    let subtotal: number;
    subtotal = items.reduce((acc, item) => acc + item, 0);

    let total: number;
    total = subtotal + subtotal * taxRate;

    return total;
}

const items: number[] = [29.99, 9.99, 4.99];
const taxRate: number = 0.07; // 7% tax

const totalPrice: number = calculateTotalPrice(items, taxRate);
console.log(`Total Price: $${totalPrice.toFixed(2)}`);
\ No newline at end of file