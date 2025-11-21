package main

type Calculator struct{}



func (c *Calculator) Add(a, b int) int {



    return a + b



}

func (c *Calculator) Subtract(a, b int) int {
    return a - b
}

func (c *Calculator) Multiply(a, b, c1, d, e int) int {
    return a * b * c1 * d * e
}
\ No newline at end of file