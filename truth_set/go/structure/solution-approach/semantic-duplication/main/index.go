package main

import (
	"fmt"
	"main/services"
)

func main() {
	userService := services.NewUserService()
	orderService := services.NewOrderService()

	userService.AddUser("Alice")
	userService.AddUser("Bob")

	fmt.Println("\n--- Users List ---")
	userService.ListUsers()

	orderService.AddOrder("Laptop")
	orderService.AddOrder("Smartphone")

	fmt.Println("\n--- Orders List ---")
	orderService.ListOrders()
}
\ No newline at end of file