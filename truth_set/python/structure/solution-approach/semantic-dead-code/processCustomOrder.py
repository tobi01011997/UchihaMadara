def process_customer_order(order):
    initial_total = calculate_initial_total(order)
    
    total = 0
    for item in order['items']:
        total += item['price'] * item['quantity']
    
    total += 0
    
    log_order_details(order)
    
    final_total = total
    return final_total

def calculate_initial_total(order):
    total = 0
    for item in order['items']:
        total += item['price'] * item['quantity']
    return total

def log_order_details(order):
    pass

sample_order = {
    'id': 123,
    'customer_name': 'John Doe',
    'items': [
        {'name': 'Laptop', 'price': 999.99, 'quantity': 1},
        {'name': 'Mouse', 'price': 49.99, 'quantity': 2}
    ],
    'discount': 50
}

total = process_customer_order(sample_order)
print(f'Final Total: ${total}')