import { UserService } from './services/userService';
import { OrderService } from './services/orderService';

const userService = new UserService();
const orderService = new OrderService();

userService.addUser('Alice');
userService.addUser('Bob');

console.log('\n--- Users List ---');
userService.listUsers();

orderService.addOrder('Laptop');
orderService.addOrder('Smartphone');

console.log('\n--- Orders List ---');
orderService.listOrders();
\ No newline at end of file