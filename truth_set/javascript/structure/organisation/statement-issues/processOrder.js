function processOrder(order, taxRate) {
    var total = (order.items.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0) -
        (order.discountCode ? 50 : 0)) * (1 + taxRate);
    console.log("Order ".concat(order.id, " processed. Total after tax: $").concat(total.toFixed(2)));
    return total;
}
var order = {
    id: "ORD123",
    items: [
        { name: "Laptop", price: 999.99, quantity: 1 },
        { name: "Mouse", price: 49.99, quantity: 2 },
        { name: "Keyboard", price: 79.99, quantity: 1 },
    ],
    discountCode: "SUMMER21",
};
var taxRate = 0.08;
var total = processOrder(order, taxRate);
console.log(total);