enum LoyaltyStatus {
    NONE = 'NONE',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    PLATINUM = 'PLATINUM',
}

enum ShippingMethod {
    STANDARD = 'STANDARD',
    EXPRESS = 'EXPRESS',
    OVERNIGHT = 'OVERNIGHT',
}

type Customer = {
    id?: string;
    name?: string;
    loyaltyStatus?: LoyaltyStatus;
};

type Option = {
    optionId?: string;
    value?: string;
};

type Discount = {
    discountId?: string;
    amount?: number;
};

type OrderItem = {
    productId?: string;
    quantity?: number;
    options?: Option[];
    discounts?: Discount[];
};

type Shipping = {
    address?: string;
    method?: ShippingMethod;
    cost?: number;
};

type Coupon = {
    code?: string;
    valid?: boolean;
    expiryDate?: string;
};

type OrderInput = {
    customer?: Customer;
    items?: OrderItem[];
    shipping?: Shipping;
    coupons?: Coupon[];
};

function processOrder(order: OrderInput): any {
    let finalOrder: any = {};
    if (!(order && order.customer && order.customer.id && order.items && order.items.length > 0)) {
        return null;
    }

    finalOrder['customerId'] = order.customer.id;
    finalOrder['customerName'] = order.customer.name || 'Valued Customer';

    if (order.customer.loyaltyStatus && order.customer.loyaltyStatus !== LoyaltyStatus.NONE) {
        finalOrder['loyalty'] = `Status: ${order.customer.loyaltyStatus}`;
    }

    finalOrder['items'] = {};
    for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        if (!(item.productId && item.quantity && item.quantity > 0)) {
            continue;
        }

        let itemTotal = 0;
        const productPrice = getProductPrice(item.productId);
        if (!(productPrice)) {
            finalOrder[`item_${i}`] = 'Price Not Available';
            continue;
        }

        itemTotal += productPrice * item.quantity;

        if (item.options && item.options.length > 0) {
            for (let j = 0; j < item.options.length; j++) {
                const option = item.options[j];
                if (!(option.optionId && option.value)) {
                    continue;
                }
                const optionPrice = getOptionPrice(option.optionId, option.value);
                if (optionPrice) {
                    itemTotal += optionPrice;
                }
            }
        }

        if (item.discounts && item.discounts.length > 0) {
            for (let k = 0; k < item.discounts.length; k++) {
                const discount = item.discounts[k];
                if (!(discount.discountId && discount.amount && discount.amount > 0)) {
                    continue;
                }
                itemTotal -= discount.amount;
            }
        }

        finalOrder['items'][`item_${i}`] = {
            productId: item.productId,
            quantity: item.quantity,
            total: itemTotal > 0 ? itemTotal : 0,
        };

        if (order.coupons && order.coupons.length > 0) {
            for (let c = 0; c < order.coupons.length; c++) {
                const coupon = order.coupons[c];
                if (!(coupon.code && coupon.valid && new Date(coupon.expiryDate) > new Date())) {
                    continue;
                }
                finalOrder[`items`][`item_${i}`]['coupon'] = coupon.code;
            }
        }
    }

    if (order.shipping && order.shipping.method) {
        if (!(order.shipping.cost && order.shipping.cost > 0)) {
            finalOrder['shipping'] = `Method: ${order.shipping.method}, Cost: Calculating`;
        } else {
            finalOrder['shipping'] = `Method: ${order.shipping.method}, Cost: $${order.shipping.cost}`;
        }
    } else {
        finalOrder['shipping'] = 'Standard Shipping';
    }

    if (!Object.keys(finalOrder['items']).length) {
        return undefined;
    }

    return finalOrder;
}

function getProductPrice(productId: string): number | null {
    const priceList: { [key: string]: number } = {
        'P001': 29.99,
        'P002': 49.99,
        'P003': 19.99,
    };
    return priceList[productId] || null;
}

function getOptionPrice(optionId: string, value: string): number | null {
    const optionPriceList: { [key: string]: { [key: string]: number } } = {
        'O001': { 'Red': 5.0, 'Blue': 5.0 },
        'O002': { 'Large': 10.0, 'Medium': 0.0 },
    };
    return optionPriceList[optionId]?.[value] || null;
}


const sampleOrder: OrderInput = {
    customer: {
        id: 'CUST12345',
        name: 'Jane Smith',
        loyaltyStatus: 'GOLD' as LoyaltyStatus,
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
        method: 'EXPRESS' as ShippingMethod,
        cost: 20.0,
    },
    coupons: [
        { code: 'WELCOME10', valid: true, expiryDate: '2025-01-01' },
        { code: 'BLACKFRIDAY', valid: false, expiryDate: '2023-11-30' },
    ],
};

const processedOrder = processOrder(sampleOrder);
console.log('Processed Order:', processedOrder);
\ No newline at end of file