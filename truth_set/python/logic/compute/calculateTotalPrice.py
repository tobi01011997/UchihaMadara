def calculateTotalPrice(price, discount, tax):
    return price * (1 - discount + tax)

price = 100
discount = 0.10  # 10%
tax = 0.05      # 5%
print(calculateTotalPrice(price, discount, tax))
\ No newline at end of file