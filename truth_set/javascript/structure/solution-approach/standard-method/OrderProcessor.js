var OrderProcessor = /** @class */ (function () {
    function OrderProcessor() {
    }
    OrderProcessor.prototype.applyDiscounts = function (orderTotal, discountsApplied) {
        if (discountsApplied > 5) {
            throw new Error("Too many discounts applied.");
        }
        if (orderTotal > 100) {
            orderTotal -= 10;
        }
        else if (orderTotal > 50) {
            orderTotal -= 5;
        }
        return orderTotal;
    };
    return OrderProcessor;
}());
var processor = new OrderProcessor();
try {
    var finalTotal = processor.applyDiscounts(120, 6);
    console.log("Final Total: $".concat(finalTotal));
}
catch (error) {
    console.error(error.message);
}