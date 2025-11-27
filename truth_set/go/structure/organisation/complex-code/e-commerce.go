package ecommerce

import (
	"fmt"
	"math"
	"time"
)

type LoyaltyStatus string

const (
	LoyaltyNone     LoyaltyStatus = "NONE"
	LoyaltySilver   LoyaltyStatus = "SILVER"
	LoyaltyGold     LoyaltyStatus = "GOLD"
	LoyaltyPlatinum LoyaltyStatus = "PLATINUM"
)

type ShippingMethod string

const (
	ShippingStandard  ShippingMethod = "STANDARD"
	ShippingExpress   ShippingMethod = "EXPRESS"
	ShippingOvernight ShippingMethod = "OVERNIGHT"
)

type Customer struct {
	ID            string        `json:"id"`
	Name          string        `json:"name"`
	LoyaltyStatus LoyaltyStatus `json:"loyaltyStatus"`
}

type Option struct {
	OptionID string `json:"optionId"`
	Value    string `json:"value"`
}

type Discount struct {
	DiscountID string  `json:"discountId"`
	Amount     float64 `json:"amount"`
}

type OrderItem struct {
	ProductID string     `json:"productId"`
	Quantity  int       `json:"quantity"`
	Options   []Option   `json:"options"`
	Discounts []Discount `json:"discounts"`
}

type Shipping struct {
	Address string         `json:"address"`
	Method  ShippingMethod `json:"method"`
	Cost    float64       `json:"cost"`
}

type Coupon struct {
	Code       string `json:"code"`
	Valid      bool   `json:"valid"`
	ExpiryDate string `json:"expiryDate"`
}

type OrderInput struct {
	Customer *Customer    `json:"customer"`
	Items    []OrderItem  `json:"items"`
	Shipping *Shipping    `json:"shipping"`
	Coupons  []Coupon    `json:"coupons"`
}

func ProcessOrder(order *OrderInput) map[string]interface{} {
	finalOrder := make(map[string]interface{})

	// Validate basic order requirements
	if order == nil || order.Customer == nil || order.Customer.ID == "" || len(order.Items) == 0 {
		return nil
	}

	// Process customer information
	finalOrder["customerId"] = order.Customer.ID
	if order.Customer.Name != "" {
		finalOrder["customerName"] = order.Customer.Name
	} else {
		finalOrder["customerName"] = "Valued Customer"
	}

	if order.Customer.LoyaltyStatus != LoyaltyNone {
		finalOrder["loyalty"] = fmt.Sprintf("Status: %s", order.Customer.LoyaltyStatus)
	}

	// Process items
	finalOrder["items"] = make(map[string]interface{})
	for i, item := range order.Items {
		if item.ProductID == "" || item.Quantity <= 0 {
			continue
		}

		itemTotal := 0.0
		productPrice := getProductPrice(item.ProductID)
		if productPrice == nil {
			finalOrder[fmt.Sprintf("item_%d", i)] = "Price Not Available"
			continue
		}

		itemTotal += *productPrice * float64(item.Quantity)

		// Process item options
		for _, option := range item.Options {
			if option.OptionID == "" || option.Value == "" {
				continue
			}
			optionPrice := getOptionPrice(option.OptionID, option.Value)
			if optionPrice != nil {
				itemTotal += *optionPrice
			}
		}

		// Process item discounts
		for _, discount := range item.Discounts {
			if discount.DiscountID == "" || discount.Amount <= 0 {
				continue
			}
			itemTotal -= discount.Amount
		}

		itemMap := map[string]interface{}{
			"productId": item.ProductID,
			"quantity":  item.Quantity,
			"total":    math.Max(itemTotal, 0),
		}

		// Process coupons
		for _, coupon := range order.Coupons {
			expiryDate, err := time.Parse("2006-01-02", coupon.ExpiryDate)
			if err != nil || !coupon.Valid || time.Now().After(expiryDate) {
				continue
			}
			itemMap["coupon"] = coupon.Code
		}

		finalOrder["items"].(map[string]interface{})[fmt.Sprintf("item_%d", i)] = itemMap
	}

	// Process shipping
	if order.Shipping != nil && order.Shipping.Method != "" {
		if order.Shipping.Cost <= 0 {
			finalOrder["shipping"] = fmt.Sprintf("Method: %s, Cost: Calculating", order.Shipping.Method)
		} else {
			finalOrder["shipping"] = fmt.Sprintf("Method: %s, Cost: $%.2f", order.Shipping.Method, order.Shipping.Cost)
		}
	} else {
		finalOrder["shipping"] = "Standard Shipping"
	}

	if len(finalOrder["items"].(map[string]interface{})) == 0 {
		return nil
	}

	return finalOrder
}

func getProductPrice(productID string) *float64 {
	priceList := map[string]float64{
		"P001": 29.99,
		"P002": 49.99,
		"P003": 19.99,
	}
	if price, ok := priceList[productID]; ok {
		return &price
	}
	return nil
}

func getOptionPrice(optionID, value string) *float64 {
	optionPriceList := map[string]map[string]float64{
		"O001": {"Red": 5.0, "Blue": 5.0},
		"O002": {"Large": 10.0, "Medium": 0.0},
	}
	if options, ok := optionPriceList[optionID]; ok {
		if price, ok := options[value]; ok {
			return &price
		}
	}
	return nil
}

func main() {
	sampleOrder := &OrderInput{
		Customer: &Customer{
			ID:            "CUST12345",
			Name:          "Jane Smith",
			LoyaltyStatus: LoyaltyGold,
		},
		Items: []OrderItem{
			{
				ProductID: "P001",
				Quantity:  3,
				Options: []Option{
					{OptionID: "O001", Value: "Red"},
					{OptionID: "O002", Value: "Large"},
				},
				Discounts: []Discount{
					{DiscountID: "D001", Amount: 10},
					{DiscountID: "D002", Amount: 5},
				},
			},
		},
		Shipping: &Shipping{
			Address: "456 Elm Street, Othertown, USA",
			Method:  ShippingExpress,
			Cost:    20.0,
		},
		Coupons: []Coupon{
			{Code: "WELCOME10", Valid: true, ExpiryDate: "2025-01-01"},
			{Code: "BLACKFRIDAY", Valid: false, ExpiryDate: "2023-11-30"},
		},
	}

	processedOrder := ProcessOrder(sampleOrder)
	fmt.Printf("Processed Order: %+v\n", processedOrder)
}
\ No newline at end of file