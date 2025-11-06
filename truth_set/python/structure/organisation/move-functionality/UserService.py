class OrderService:
    def __init__(self):
        self.orders = []

    def place_order(self, order):
        self.orders.append(order)
        self.notify(f"Order placed: {order['id']}")

    def cancel_order(self, order_id):
        self.orders = [order for order in self.orders if order['id'] != order_id]
        self.notify(f"Order canceled: {order_id}")

    def notify(self, message):
        print(f"Notification: {message}")