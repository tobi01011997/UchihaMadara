function calculateTotalPrice(items, taxRate) {
    var subtotal;
    subtotal = items.reduce(function (acc, item) { return acc + item; }, 0);
    var total;
    total = subtotal + subtotal * taxRate;
    return total;
}
var items = [29.99, 9.99, 4.99];
var taxRate = 0.07; // 7% tax
var totalPrice = calculateTotalPrice(items, taxRate);
console.log("Total Price: $".concat(totalPrice.toFixed(2)));