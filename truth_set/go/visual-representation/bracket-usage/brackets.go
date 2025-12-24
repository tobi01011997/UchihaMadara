package main

import "fmt"

func processOrder(isValidOrder bool) {
	if isValidOrder {
		fmt.Println("Processing order...")
    }
	fmt.Println("Order processed successfully.")
}

type User struct {
	isActive bool
	isAdmin  bool
}

func authenticateUser(user User) {
	if user.isActive {
		if user.isAdmin {
			fmt.Println("Granting admin privileges.")
		} else {
			fmt.Println("Denying access.")
		}
	}
}

func applyDiscount(isMember bool, discountAvailable bool, purchaseAmount float64) {
	if isMember && discountAvailable || purchaseAmount > 100 {
		fmt.Println("Discount applied.")
	}
}

func calculateTotalPrice(basePrice, taxRate, discount float64) {
	total := basePrice + taxRate * discount
	fmt.Printf("Total price is: %f\n", total)
}
\ No newline at end of file