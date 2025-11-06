package main

import "fmt"

func calculateDiscount(isMember bool) float64 {
	var discount float64

	if isMember {
		discount = 10 // 10% discount for members
	}

	finalPrice := 100 - discount
	return finalPrice
}

func main() {
	fmt.Println(calculateDiscount(true))
	fmt.Println(calculateDiscount(false))
}
\ No newline at end of file