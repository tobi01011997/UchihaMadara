def process_order(order, tax_rate):
    total = (sum(item["price"] * item["quantity"] for item in order["items"]) - 
            (50 if order["discount_code"] else 0)) * (1 + tax_rate)
    
    print(f"Order {order['id']} processed. Total after tax: ${total:.2f}")
    return total

order = {
    "id": "ORD123",
    "items": [
        {"name": "Laptop", "price": 999.99, "quantity": 1},
        {"name": "Mouse", "price": 49.99, "quantity": 2}, 
        {"name": "Keyboard", "price": 79.99, "quantity": 1}
    ],
    "discount_code": "SUMMER21"
}

tax_rate = 0.08
total = process_order(order, tax_rate)
print(total)