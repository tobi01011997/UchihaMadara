var OrderService = /** @class */ (function () {
    function OrderService() {
        this.orders = [];
    }
    OrderService.prototype.placeOrder = function (order) {
        this.orders.push(order);
        this.notify("Order placed: ".concat(order.id));
    };
    OrderService.prototype.cancelOrder = function (orderId) {
        this.orders = this.orders.filter(function (order) { return order.id !== orderId; });
        this.notify("Order canceled: ".concat(orderId));
    };
    OrderService.prototype.notify = function (message) {
        console.log("Notification: ".concat(message));
    };
    return OrderService;
}());