package compare

import "fmt"

func compareTypes(a interface{}, b interface{}) bool {
    switch v := a.(type) {
    case string:
        return v > fmt.Sprint(b)
    default:
        return false
    }
}

func main_compareTypes() {
    fmt.Println(compareTypes("1", 2))
    fmt.Println(compareTypes("3", 2))
    fmt.Println(compareTypes("abc", 2))
}
\ No newline at end of file