package compare

import "fmt"
import "strconv"

func isEqual(a interface{}, b interface{}) bool {
    switch v := a.(type) {
    case string:
        if i, err := strconv.Atoi(v); err == nil {
            return i == b
        }
    }
    return a == b
}

func main_isEqual() {
    fmt.Println(isEqual("5", 5))
    fmt.Println(isEqual(0, false))
}
\ No newline at end of file