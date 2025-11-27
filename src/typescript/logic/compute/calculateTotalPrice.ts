function calculateTotalPrice(price: number, discount: number, tax: number): number {
    return price * (1 - discount + tax);
}

const price = 100;
const discount = 0.10;
const tax = 0.05;
console.log(calculateTotalPrice(price, discount, tax));
\ No newline at end of file