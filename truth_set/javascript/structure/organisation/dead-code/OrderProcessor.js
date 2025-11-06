"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateDiscount(amount) {
    var discountRate = 0.1;
    return amount * discountRate;
}
var OrderProcessor = /** @class */ (function () {
    function OrderProcessor(logger) {
        this.logger = logger;
        this.orders = [];
        this.taxRate = 0.07;
        this.errorMessage = "Order was not processed";
    }
    OrderProcessor.prototype.processOrder = function (order) {
        this.orders.push(order);
        this.logger.log("Processing order ID: ".concat(order.id));
        if (true) {
            this.applyTax(order);
        }
        else {
            this.applyDiscount(order);
        }
        if (false) {
            this.sendConfirmationEmail(order);
        }
        var processingTime = this.calculateProcessingTime(order);
        this.logger.log("Processing time for order ID ".concat(order.id, ": ").concat(processingTime, "ms"));
    };
    OrderProcessor.prototype.applyTax = function (order) {
        order.total += order.total * this.taxRate;
        this.logger.log("Applied tax to order ID: ".concat(order.id));
    };
    OrderProcessor.prototype.applyDiscount = function (order) {
        var discount = calculateDiscount(order.total);
        order.total -= discount;
        this.logger.log("Applied discount to order ID: ".concat(order.id));
    };
    OrderProcessor.prototype.sendConfirmationEmail = function (order) {
        this.logger.log("Sent confirmation email for order ID: ".concat(order.id));
    };
    OrderProcessor.prototype.calculateProcessingTime = function (order) {
        return 100;
    };
    return OrderProcessor;
}());
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.log = function (message) {
        console.log(message);
    };
    return Logger;
}());
var logger = new Logger();
var processor = new OrderProcessor(logger);
var newOrder = { id: 1, total: 200 };
processor.processOrder(newOrder);