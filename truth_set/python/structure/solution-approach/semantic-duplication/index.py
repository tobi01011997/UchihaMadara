from services.userService import UserService
from services.orderService import OrderService

user_service = UserService()
order_service = OrderService()

user_service.add_user('Alice')
user_service.add_user('Bob')

print('\n--- Users List ---')
user_service.list_users()

order_service.add_order('Laptop')
order_service.add_order('Smartphone')

print('\n--- Orders List ---')
order_service.list_orders()
\ No newline at end of file