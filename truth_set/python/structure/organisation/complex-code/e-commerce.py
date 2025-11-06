from enum import Enum
from typing import Dict, List, Optional, Any
from datetime import datetime

class LoyaltyStatus(Enum):
    NONE = "NONE"
    SILVER = "SILVER" 
    GOLD = "GOLD"
    PLATINUM = "PLATINUM"

class ShippingMethod(Enum):
    STANDARD = "STANDARD"
    EXPRESS = "EXPRESS"
    OVERNIGHT = "OVERNIGHT"

def process_order(order: Dict) -> Optional[Dict]:
    final_order = {}
    
    if not (order and order.get('customer') and order['customer'].get('id') and 
            order.get('items') and len(order['items']) > 0):
        return None
        
    final_order['customerId'] = order['customer']['id']
    final_order['customerName'] = order['customer'].get('name', 'Valued Customer')
    
    if order['customer'].get('loyaltyStatus') and order['customer']['loyaltyStatus'] != LoyaltyStatus.NONE.value:
        final_order['loyalty'] = f"Status: {order['customer']['loyaltyStatus']}"
        
    final_order['items'] = {}
    
    for i, item in enumerate(order['items']):
        if not (item.get('productId') and item.get('quantity') and item['quantity'] > 0):
            continue
            
        item_total = 0
        product_price = get_product_price(item['productId'])
        
        if not product_price:
            final_order[f'item_{i}'] = 'Price Not Available'
            continue
            
        item_total += product_price * item['quantity']
        
        if item.get('options') and len(item['options']) > 0:
            for option in item['options']:
                if not (option.get('optionId') and option.get('value')):
                    continue
                    
                option_price = get_option_price(option['optionId'], option['value'])
                if option_price:
                    item_total += option_price
                    
        if item.get('discounts') and len(item['discounts']) > 0:
            for discount in item['discounts']:
                if not (discount.get('discountId') and discount.get('amount') and discount['amount'] > 0):
                    continue
                item_total -= discount['amount']
                
        final_order['items'][f'item_{i}'] = {
            'productId': item['productId'],
            'quantity': item['quantity'],
            'total': max(item_total, 0)
        }
        
        if order.get('coupons') and len(order['coupons']) > 0:
            for coupon in order['coupons']:
                if not (coupon.get('code') and coupon.get('valid') and 
                        datetime.strptime(coupon['expiryDate'], '%Y-%m-%d') > datetime.now()):
                    continue
                final_order['items'][f'item_{i}']['coupon'] = coupon['code']
                
    if order.get('shipping') and order['shipping'].get('method'):
        if not (order['shipping'].get('cost') and order['shipping']['cost'] > 0):
            final_order['shipping'] = f"Method: {order['shipping']['method']}, Cost: Calculating"
        else:
            final_order['shipping'] = f"Method: {order['shipping']['method']}, Cost: ${order['shipping']['cost']}"
    else:
        final_order['shipping'] = 'Standard Shipping'
        
    if not final_order['items']:
        return None
        
    return final_order

def get_product_price(product_id: str) -> Optional[float]:
    price_list = {
        'P001': 29.99,
        'P002': 49.99,
        'P003': 19.99
    }
    return price_list.get(product_id)

def get_option_price(option_id: str, value: str) -> Optional[float]:
    option_price_list = {
        'O001': {'Red': 5.0, 'Blue': 5.0},
        'O002': {'Large': 10.0, 'Medium': 0.0}
    }
    return option_price_list.get(option_id, {}).get(value)

sample_order = {
    'customer': {
        'id': 'CUST12345',
        'name': 'Jane Smith',
        'loyaltyStatus': 'GOLD'
    },
    'items': [
        {
            'productId': 'P001',
            'quantity': 3,
            'options': [
                {'optionId': 'O001', 'value': 'Red'},
                {'optionId': 'O002', 'value': 'Large'}
            ],
            'discounts': [
                {'discountId': 'D001', 'amount': 10},
                {'discountId': 'D002', 'amount': 5}
            ]
        },
        {
            'productId': 'P004',
            'quantity': 2,
            'options': [
                {'optionId': 'O003', 'value': 'Green'}
            ],
            'discounts': [
                {'discountId': 'D003', 'amount': -5}
            ]
        },
        {
            'quantity': 1,
            'options': [
                {'optionId': 'O001', 'value': 'Blue'}
            ],
            'discounts': [
                {'discountId': 'D004', 'amount': 3}
            ]
        }
    ],
    'shipping': {
        'address': '456 Elm Street, Othertown, USA',
        'method': 'EXPRESS',
        'cost': 20.0
    },
    'coupons': [
        {'code': 'WELCOME10', 'valid': True, 'expiryDate': '2025-01-01'},
        {'code': 'BLACKFRIDAY', 'valid': False, 'expiryDate': '2023-11-30'}
    ]
}

processed_order = process_order(sample_order)
print('Processed Order:', processed_order)