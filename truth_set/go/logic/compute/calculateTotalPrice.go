package compute

func calculateTotalPrice(price, discount, tax float64) float64 {
    return price * (1 - discount + tax)
}
\ No newline at end of file