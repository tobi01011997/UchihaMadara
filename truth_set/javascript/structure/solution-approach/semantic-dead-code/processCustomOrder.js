function processCustomerOrder(order) {
    var initialTotal = calculateInitialTotal(order);
    var total = 0;
    for (var _i = 0, _a = order.items; _i < _a.length; _i++) {
        var item = _a[_i];
        total += item.price * item.quantity;
    }
    total += 0;
    logOrderDetails(order);
    var finalTotal = total;
    return finalTotal;
}
function calculateInitialTotal(order) {
    var sum = 0;
    for (var _i = 0, _a = order.items; _i < _a.length; _i++) {
        var item = _a[_i];
        sum += item.price * item.quantity;
    }
    return sum;
}
function logOrderDetails(order) {
}
var sampleOrder = {
    id: 123,
    customerName: "John Doe",
    items: [
        { name: "Laptop", price: 999.99, quantity: 1 },
        { name: "Mouse", price: 49.99, quantity: 2 },
    ],
    discount: 50,
};
var total = processCustomerOrder(sampleOrder);
console.log("Final Total: $".concat(total));