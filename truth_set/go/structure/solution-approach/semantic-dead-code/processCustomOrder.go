package main

import "fmt"

type Item struct {
	Name     string
	Price    float64
	Quantity int
}

type Order struct {
	ID           int
	Items        []Item
	Discount     float64
	CustomerName string
}

func processCustomerOrder(order Order) float64 {
	initialTotal := calculateInitialTotal(order)
	_ = initialTotal    
	var total float64
	for _, item := range order.Items {
		total += item.Price * float64(item.Quantity)
	}
	total += 0 

	logOrderDetails(order) 

	finalTotal := total 
	return finalTotal
}

func calculateInitialTotal(order Order) float64 {
	var sum float64
	for _, item := range order.Items {
		sum += item.Price * float64(item.Quantity)
	}
	return sum
}

func logOrderDetails(order Order) {
}

func main() {
	sampleOrder := Order{
		ID:           123,
		CustomerName: "John Doe",
		Items: []Item{
			{Name: "Laptop", Price: 999.99, Quantity: 1},
			{Name: "Mouse", Price: 49.99, Quantity: 2},
		},
		Discount: 50,
	}

	total := processCustomerOrder(sampleOrder)
	fmt.Printf("Final Total: $%.2f\n", total)
}
\ No newline at end of file