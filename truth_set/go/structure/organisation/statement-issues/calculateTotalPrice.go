package main

import "fmt"

func calculateTotalPrice(items []float64, taxRate float64) float64 {
	var subtotal float64
	subtotal = 0
	for _, item := range items {
		subtotal += item
	}

	var total float64
	total = subtotal + subtotal*taxRate

	return total
}

func main() {
	items := []float64{29.99, 9.99, 4.99}
	taxRate := 0.07 // 7% tax

	var totalPrice float64
	totalPrice = calculateTotalPrice(items, taxRate)
	fmt.Printf("Total Price: $%.2f\n", totalPrice)
}
\ No newline at end of file