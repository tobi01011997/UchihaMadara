def calculate_total_price(items, tax_rate):
    subtotal = None
    subtotal = sum(items)
    
    total = None 
    total = subtotal + subtotal * tax_rate
    return total

items = [29.99, 9.99, 4.99]
tax_rate = 0.07  # 7% tax
total_price = calculate_total_price(items, tax_rate)
print(f"Total Price: ${total_price:.2f}")