function calculateTotalPrice(price, discount, tax) {
    return price * (1 - discount + tax);
}
var price = 100;
var discount = 0.10;
var tax = 0.05;
console.log(calculateTotalPrice(price, discount, tax));