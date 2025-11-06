class OrderProcessor:
    def apply_discounts(self, order_total, discounts_applied):
        if discounts_applied > 5:
            raise Exception("Too many discounts applied.")
            
        if order_total > 100:
            order_total -= 10  
        elif order_total > 50:
            order_total -= 5
            
        return order_total

processor = OrderProcessor()

try:
    final_total = processor.apply_discounts(120, 6)
    print(f"Final Total: ${final_total}")
except Exception as error:
    print(f"Error: {str(error)}")