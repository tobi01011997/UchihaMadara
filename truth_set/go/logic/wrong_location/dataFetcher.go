package wrong_location

import (
    "fmt"
    "time"
)

type UserProfile struct {
    data map[string]string
}

func NewUserProfile() *UserProfile {
    up := &UserProfile{}
    go up.fetchData() 
    return up
}

func (up *UserProfile) fetchData() {
    time.Sleep(1 * time.Second)
    up.data = map[string]string{"name": "Alice"}
    fmt.Println("Data fetched:", up.data)
}

func (up *UserProfile) PrintData() {
    fmt.Println("User Data:", up.data)
}

func dataFetcherMain() {
    profile := NewUserProfile()
    profile.PrintData()
}
\ No newline at end of file