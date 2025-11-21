package services

import (
	"fmt"
	"time"
)

type Order struct {
	OrderID   int
	Product   string
	OrderDate time.Time
}

type OrderService struct {
	orders []Order
}

func NewOrderService() *OrderService {
	return &OrderService{orders: make([]Order, 0)}
}

func (s *OrderService) AddOrder(product string) {
	newOrder := Order{
		OrderID:   len(s.orders) + 1,
		Product:   product,
		OrderDate: time.Now(),
	}
	s.orders = append(s.orders, newOrder)
	formattedDate := s.formatDate(newOrder.OrderDate, "DD-MM-YYYY")
	fmt.Printf("Order Added: %s, Order Date: %s\n", newOrder.Product, formattedDate)
}

func (s *OrderService) ListOrders() {
	for _, order := range s.orders {
		formattedDate := s.formatDate(order.OrderDate, "YYYY-MM-DD")
		fmt.Printf("Order ID: %d, Product: %s, Order Date: %s\n",
			order.OrderID, order.Product, formattedDate)
	}
}

func (s *OrderService) formatDate(date time.Time, format string) string {
	year := date.Format("2006")
	month := date.Format("01")
	day := date.Format("02")

	switch format {
	case "MM/DD/YYYY":
		return month + "/" + day + "/" + year
	case "DD-MM-YYYY":
		return day + "-" + month + "-" + year
	default:
		return year + "-" + month + "-" + day
	}
}
\ No newline at end of file