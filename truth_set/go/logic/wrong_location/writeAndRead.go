package wrong_location

import (
    "fmt"
    "io/ioutil"
    "time"
)

func readFromDatabase(callback func(string)) {
    go func() {
        time.Sleep(1 * time.Second)
        callback("Hello from the Database!")
    }()
}

func writeAndRead() {
    readFromDatabase(func(data string) {
        go func() {
            err := ioutil.WriteFile("message.txt", []byte(data), 0644)
            if err != nil {
                fmt.Println("Write Error:", err)
                return
            }
            fmt.Println("File written successfully.")
        }()
    })

    content, err := ioutil.ReadFile("message.txt")
    if err != nil {
        fmt.Println("Read Error:", err)
        return
    }
    fmt.Println("File Content:", string(content))
}

func writeAndReadMain() {
    writeAndRead()
    time.Sleep(2 * time.Second)
}
\ No newline at end of file