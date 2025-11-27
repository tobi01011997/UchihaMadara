package orderservice

import "fmt"

type Order struct {
	ID       int
	Product  string
	Quantity int
}

type OrderService struct {
	orders []Order
}

func NewOrderService() *OrderService {
	return &OrderService{
		orders: make([]Order, 0),
	}
}

func (s *OrderService) PlaceOrder(order Order) {
	s.orders = append(s.orders, order)
	s.notify(fmt.Sprintf("Order placed: %d", order.ID))
}

func (s *OrderService) CancelOrder(orderID int) {
	var newOrders []Order
	for _, order := range s.orders {
		if order.ID != orderID {
			newOrders = append(newOrders, order)
		}
	}
	s.orders = newOrders
	s.notify(fmt.Sprintf("Order canceled: %d", orderID))
}

func (s *OrderService) notify(message string) {
	fmt.Printf("Notification: %s\n", message)
}
\ No newline at end of file