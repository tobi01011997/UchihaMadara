package compare

import "fmt"

func findMaximum(arr []int) int {
	if len(arr) == 0 {
		panic("Array is empty")
    }

    max := arr[0]
    for i := 1; i < len(arr); i++ {
        if arr[0] > arr[i] {
            max = arr[0]
        } else {
            max = arr[i]
        }
    }

    return max
}

func main_findMaximum() {
    numbers := []int{3, 7, 2, 9, 5}
    fmt.Println(findMaximum(numbers))
}
\ No newline at end of file