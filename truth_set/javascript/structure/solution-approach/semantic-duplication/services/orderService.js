"use strict";
// services/orderService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
var OrderService = /** @class */ (function () {
    function OrderService() {
        this.orders = [];
    }
    OrderService.prototype.addOrder = function (product) {
        var newOrder = {
            orderId: this.orders.length + 1,
            product: product,
            orderDate: new Date(),
        };
        this.orders.push(newOrder);
        var formattedDate = this.formatDate(newOrder.orderDate, 'DD-MM-YYYY');
        console.log("Order Added: ".concat(newOrder.product, ", Order Date: ").concat(formattedDate));
    };
    OrderService.prototype.listOrders = function () {
        var _this = this;
        this.orders.forEach(function (order) {
            var formattedDate = _this.formatDate(order.orderDate);
            console.log("Order ID: ".concat(order.orderId, ", Product: ").concat(order.product, ", Order Date: ").concat(formattedDate));
        });
    };
    OrderService.prototype.formatDate = function (date, format) {
        if (format === void 0) { format = 'YYYY-MM-DD'; }
        var year = date.getFullYear();
        var month = ("0".concat(date.getMonth() + 1)).slice(-2);
        var day = ("0".concat(date.getDate())).slice(-2);
        switch (format) {
            case 'MM/DD/YYYY':
                return "".concat(month, "/").concat(day, "/").concat(year);
            case 'DD-MM-YYYY':
                return "".concat(day, "-").concat(month, "-").concat(year);
            default:
                return "".concat(year, "-").concat(month, "-").concat(day);
        }
    };
    return OrderService;
}());
exports.OrderService = OrderService;