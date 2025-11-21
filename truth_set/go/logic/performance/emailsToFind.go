package performance

import (
    "fmt"
)

type User struct {
    ID    int
    Email string
}

func emailsToFind() {
    users := make([]User, 100000)
    for i := range users {
        users[i] = User{
            ID:    i + 1,
            Email: fmt.Sprintf("user%d@example.com", i+1),
        }
    }

    emailsToFind := []string{"user100@example.com", "user200@example.com", "user300@example.com"}

    for _, email := range emailsToFind {
        for _, user := range users {
            if user.Email == email {
                fmt.Println(user.ID)
                break
            }
        }
    }
}
\ No newline at end of file