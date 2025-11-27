def apply_discount(is_member, discount_available, purchase_amount):
    if is_member and discount_available or purchase_amount > 100:
        print("Discount applied.")

def calculate_total_price(base_price, tax_rate, discount):
    total = base_price + tax_rate * discount  
    print(f"Total price is: {total}")