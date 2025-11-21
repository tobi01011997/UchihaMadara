package performance

import (
    "fmt"
    "math"
)

func compute(x float64) float64 {
    var result float64
    for i := 0; i < 1000000; i++ {
        result += math.Sqrt(x + float64(i))
    }
    return result
}

func main() {
    numbers := []float64{10, 20, 30}

    for _, num := range numbers {
        fmt.Printf("Value: %f\n", compute(num))
        fmt.Printf("Double: %f\n", compute(num)*2)
        fmt.Printf("Half: %f\n", compute(num)/2)
    }
}
\ No newline at end of file