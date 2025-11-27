package main

import (
	"fmt"
	"errors"
)

type OrderProcessor struct{}

func (op *OrderProcessor) applyDiscounts(orderTotal float64, discountsApplied int) (float64, error) {
	if discountsApplied > 5 {
		return 0, errors.New("Too many discounts applied.")
	}

	if orderTotal > 100 {
		orderTotal -= 10
	} else if orderTotal > 50 {
		orderTotal -= 5
	}

	return orderTotal, nil
}

func main() {
	processor := &OrderProcessor{}
	finalTotal, err := processor.applyDiscounts(120, 6)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Printf("Final Total: $%.2f\n", finalTotal)
}
\ No newline at end of file