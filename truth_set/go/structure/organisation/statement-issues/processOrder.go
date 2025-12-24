package main

import "fmt"

type Item struct {
	Name     string
	Price    float64
	Quantity int
}

type Order struct {
	ID           string
	Items        []Item
	DiscountCode string
}

func processOrder(order Order, taxRate float64) float64 {
	total := (calculateItemsTotal(order.Items) - 
		getDiscountAmount(order.DiscountCode)) * (1 + taxRate)

	fmt.Printf("Order %s processed. Total after tax: $%.2f\n", order.ID, total)
	return total
}

func calculateItemsTotal(items []Item) float64 {
	var sum float64
	for _, item := range items {
		sum += item.Price * float64(item.Quantity)
	}
	return sum
}

func getDiscountAmount(discountCode string) float64 {
	if discountCode != "" {
		return 50 // Magic number for discount amount
	}
	return 0
}

func main_order() {
	order := Order{
		ID: "ORD123",
		Items: []Item{
			{Name: "Laptop", Price: 999.99, Quantity: 1},
			{Name: "Mouse", Price: 49.99, Quantity: 2},
			{Name: "Keyboard", Price: 79.99, Quantity: 1},
		},
		DiscountCode: "SUMMER21",
	}
	taxRate := 0.08
	total := processOrder(order, taxRate)
	fmt.Println(total)
}
\ No newline at end of file