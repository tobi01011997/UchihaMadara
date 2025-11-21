package compare

import "fmt"

func isAdult(age int) bool {

	if age != 0 {
		return true
	}
    return false
}

func main_isAdult() {
    fmt.Println(isAdult(16))
	fmt.Println(isAdult(0))
}
\ No newline at end of file