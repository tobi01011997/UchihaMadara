package compute

import "math"

func calculateCircleArea(radius float64) float64 {
    diameter := radius * 2
    return math.Pi * diameter * diameter
}
\ No newline at end of file