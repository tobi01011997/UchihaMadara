package supermarket

import (
	"fmt"
	"time"
)

type UserService struct{}

func (s *UserService) GetUserProfile(userID int) string {
	time.Sleep(time.Second)
	return fmt.Sprintf("User Profile for ID: %d", userID)
}

func (s *UserService) CheckUserEligibility(age int) bool {
	return age >= 18
}

type ProductService struct{}

func (s *ProductService) GetProduct(productID int) string {
	products := map[int]string{
		101: "Laptop",
		102: "Smartphone", 
		103: "Headphones",
	}
	if product, ok := products[productID]; ok {
		return product
	}
	return "Product Not Found"
}

func (s *ProductService) ValidateProductStock(stock int) bool {
	return stock > 0
}

type OrderService struct{}

func (s *OrderService) RetrieveOrder(orderID int) string {
	orders := map[int]string{
		5001: "Order #5001: Shipped",
		5002: "Order #5002: Processing",
		5003: "Order #5003: Delivered",
	}
	if order, ok := orders[orderID]; ok {
		return order
	}
	return "Order Not Found"
}

func (s *OrderService) VerifyOrderStatus(completed bool) bool {
	return completed
}

func main() {
	userService := &UserService{}
	fmt.Println(userService.GetUserProfile(1))
	fmt.Println(userService.CheckUserEligibility(20))

	productService := &ProductService{}
	fmt.Println(productService.GetProduct(101))
	fmt.Println(productService.ValidateProductStock(0))

	orderService := &OrderService{}
	fmt.Println(orderService.RetrieveOrder(5002))
	fmt.Println(orderService.VerifyOrderStatus(true))
}
\ No newline at end of file