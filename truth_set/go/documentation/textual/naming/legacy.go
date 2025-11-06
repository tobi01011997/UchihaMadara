package naming

import (
    "fmt"
    "strings"
)

func proc(u map[string]string) map[string]string {
    if u == nil || u["nm"] == "" {
        panic("Invalid input")
    }

    u["a"] = strings.ToUpper(u["nm"])

    return u
}

func main() {
    userData := map[string]string{
        "nm": "john doe",
        "a":  "",
    }

    result := proc(userData)
    fmt.Println(result)
}
\ No newline at end of file