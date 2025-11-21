package main

import (
    "fmt"
    "strconv"
)

func processUserAge(age interface{}) {
    var numericAge float64
    
    switch v := age.(type) {
    case string:
        n, _ := strconv.ParseFloat(v, 64)
        numericAge = n
    case nil:
        numericAge = 0
    default:
        numericAge = 0
    }

    if numericAge >= 18 {
        fmt.Println("User is an adult.")
    } else {
        fmt.Println("User is a minor.") 
    }
}

func main() {
    processUserAge("twenty")
    processUserAge(nil)
}
\ No newline at end of file