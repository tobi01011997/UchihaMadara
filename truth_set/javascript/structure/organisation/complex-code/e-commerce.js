var LoyaltyStatus;
(function (LoyaltyStatus) {
    LoyaltyStatus["NONE"] = "NONE";
    LoyaltyStatus["SILVER"] = "SILVER";
    LoyaltyStatus["GOLD"] = "GOLD";
    LoyaltyStatus["PLATINUM"] = "PLATINUM";
})(LoyaltyStatus || (LoyaltyStatus = {}));
var ShippingMethod;
(function (ShippingMethod) {
    ShippingMethod["STANDARD"] = "STANDARD";
    ShippingMethod["EXPRESS"] = "EXPRESS";
    ShippingMethod["OVERNIGHT"] = "OVERNIGHT";
})(ShippingMethod || (ShippingMethod = {}));
function processOrder(order) {
    var finalOrder = {};
    if (!(order && order.customer && order.customer.id && order.items && order.items.length > 0)) {
        return null;
    }
    finalOrder['customerId'] = order.customer.id;
    finalOrder['customerName'] = order.customer.name || 'Valued Customer';
    if (order.customer.loyaltyStatus && order.customer.loyaltyStatus !== LoyaltyStatus.NONE) {
        finalOrder['loyalty'] = "Status: ".concat(order.customer.loyaltyStatus);
    }
    finalOrder['items'] = {};
    for (var i = 0; i < order.items.length; i++) {
        var item = order.items[i];
        if (!(item.productId && item.quantity && item.quantity > 0)) {
            continue;
        }
        var itemTotal = 0;
        var productPrice = getProductPrice(item.productId);
        if (!(productPrice)) {
            finalOrder["item_".concat(i)] = 'Price Not Available';
            continue;
        }
        itemTotal += productPrice * item.quantity;
        if (item.options && item.options.length > 0) {
            for (var j = 0; j < item.options.length; j++) {
                var option = item.options[j];
                if (!(option.optionId && option.value)) {
                    continue;
                }
                var optionPrice = getOptionPrice(option.optionId, option.value);
                if (optionPrice) {
                    itemTotal += optionPrice;
                }
            }
        }
        if (item.discounts && item.discounts.length > 0) {
            for (var k = 0; k < item.discounts.length; k++) {
                var discount_1 = item.discounts[k];
                if (!(discount_1.discountId && discount_1.amount && discount_1.amount > 0)) {
                    continue;
                }
                itemTotal -= discount_1.amount;
            }
        }
        finalOrder['items']["item_".concat(i)] = {
            productId: item.productId,
            quantity: item.quantity,
            total: itemTotal > 0 ? itemTotal : 0,
        };
        if (order.coupons && order.coupons.length > 0) {
            for (var c = 0; c < order.coupons.length; c++) {
                var coupon = order.coupons[c];
                if (!(coupon.code && coupon.valid && new Date(coupon.expiryDate) > new Date())) {
                    continue;
                }
                finalOrder["items"]["item_".concat(i)]['coupon'] = coupon.code;
            }
        }
    }
    if (order.shipping && order.shipping.method) {
        if (!(order.shipping.cost && order.shipping.cost > 0)) {
            finalOrder['shipping'] = "Method: ".concat(order.shipping.method, ", Cost: Calculating");
        }
        else {
            finalOrder['shipping'] = "Method: ".concat(order.shipping.method, ", Cost: $").concat(order.shipping.cost);
        }
    }
    else {
        finalOrder['shipping'] = 'Standard Shipping';
    }
    if (!Object.keys(finalOrder['items']).length) {
        return undefined;
    }
    return finalOrder;
}
function getProductPrice(productId) {
    var priceList = {
        'P001': 29.99,
        'P002': 49.99,
        'P003': 19.99,
    };
    return priceList[productId] || null;
}
function getOptionPrice(optionId, value) {
    var _a;
    var optionPriceList = {
        'O001': { 'Red': 5.0, 'Blue': 5.0 },
        'O002': { 'Large': 10.0, 'Medium': 0.0 },
    };
    return ((_a = optionPriceList[optionId]) === null || _a === void 0 ? void 0 : _a[value]) || null;
}
var sampleOrder = {
    customer: {
        id: 'CUST12345',
        name: 'Jane Smith',
        loyaltyStatus: 'GOLD',
    },
    items: [
        {
            productId: 'P001',
            quantity: 3,
            options: [
                { optionId: 'O001', value: 'Red' },
                { optionId: 'O002', value: 'Large' },
            ],
            discounts: [
                { discountId: 'D001', amount: 10 },
                { discountId: 'D002', amount: 5 },
            ],
        },
        {
            productId: 'P004',
            quantity: 2,
            options: [
                { optionId: 'O003', value: 'Green' },
            ],
            discounts: [
                { discountId: 'D003', amount: -5 },
            ],
        },
        {
            quantity: 1,
            options: [
                { optionId: 'O001', value: 'Blue' },
            ],
            discounts: [
                { discountId: 'D004', amount: 3 },
            ],
        },
    ],
    shipping: {
        address: '456 Elm Street, Othertown, USA',
        method: 'EXPRESS',
        cost: 20.0,
    },
    coupons: [
        { code: 'WELCOME10', valid: true, expiryDate: '2025-01-01' },
        { code: 'BLACKFRIDAY', valid: false, expiryDate: '2023-11-30' },
    ],
};
var processedOrder = processOrder(sampleOrder);
console.log('Processed Order:', processedOrder);