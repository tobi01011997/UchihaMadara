from dataclasses import dataclass
from typing import List
from os import path

def calculate_discount(amount: float) -> float:
    discount_rate = 0.1
    return amount * discount_rate

@dataclass
class Order:
    id: int
    total: float

class OrderProcessor:
    def __init__(self, logger):
        self.logger = logger
        self.orders: List[Order] = []
        self.tax_rate = 0.07
        self.error_message = "Order was not processed"

    def process_order(self, order: Order) -> None:
        self.orders.append(order)
        self.logger.log(f"Processing order ID: {order.id}")
        
        if True:
            self.apply_tax(order)
        else:
            self.apply_discount(order)
            
        if False:
            self.send_confirmation_email(order)
            
        processing_time = self.calculate_processing_time(order)
        self.logger.log(f"Processing time for order ID {order.id}: {processing_time}ms")

    def apply_tax(self, order: Order) -> None:
        order.total += order.total * self.tax_rate
        self.logger.log(f"Applied tax to order ID: {order.id}")

    def apply_discount(self, order: Order) -> None:
        discount = calculate_discount(order.total)
        order.total -= discount
        self.logger.log(f"Applied discount to order ID: {order.id}")

    def send_confirmation_email(self, order: Order) -> None:
        self.logger.log(f"Sent confirmation email for order ID: {order.id}")

    def calculate_processing_time(self, order: Order) -> int:
        return 100

class Logger:
    def log(self, message: str) -> None:
        print(message)

logger = Logger()
processor = OrderProcessor(logger)
new_order = Order(id=1, total=200)
processor.process_order(new_order)