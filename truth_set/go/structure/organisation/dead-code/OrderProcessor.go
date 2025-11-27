package orderprocessor

import (
	"fmt"
)

func calculateDiscount(amount float64) float64 {
	discountRate := 0.1
	return amount * discountRate
}

type Order struct {
	ID    int
	Total float64
}

type Logger struct{}

func (l *Logger) Log(message string) {
	fmt.Println(message)
}

type OrderProcessor struct {
	orders       []Order
	taxRate      float64
	errorMessage string
	logger       *Logger
}

func NewOrderProcessor(logger *Logger) *OrderProcessor {
	return &OrderProcessor{
		orders:       make([]Order, 0),
		taxRate:      0.07,
		errorMessage: "Order was not processed",
		logger:       logger,
	}
}

func (p *OrderProcessor) ProcessOrder(order Order) {
	p.orders = append(p.orders, order)
	p.logger.Log(fmt.Sprintf("Processing order ID: %d", order.ID))

	if true {
		p.applyTax(&order)
	} else {
		p.applyDiscount(&order)
	}

	if false {
		p.sendConfirmationEmail(&order)
	}
}

func (p *OrderProcessor) applyTax(order *Order) {
	order.Total += order.Total * p.taxRate
	p.logger.Log(fmt.Sprintf("Applied tax to order ID: %d", order.ID))
}

func (p *OrderProcessor) applyDiscount(order *Order) {
	discount := calculateDiscount(order.Total)
	order.Total -= discount
	p.logger.Log(fmt.Sprintf("Applied discount to order ID: %d", order.ID))
}

func (p *OrderProcessor) sendConfirmationEmail(order *Order) {
	p.logger.Log(fmt.Sprintf("Sent confirmation email for order ID: %d", order.ID))
}

func main() {
	logger := &Logger{}
	processor := NewOrderProcessor(logger)

	newOrder := Order{ID: 1, Total: 200}
	processor.ProcessOrder(newOrder)
}
\ No newline at end of file