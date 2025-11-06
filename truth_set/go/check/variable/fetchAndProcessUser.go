package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"` 
}

func fetchAndProcessUser(userID int) error {
	resp, err := http.Get(fmt.Sprintf("https://api.example.com/users/%d", userID))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	var user User
	err = json.Unmarshal(body, &user)
	if err != nil {
		return err
	}

	fmt.Printf("User Name: %s\n", strings.ToUpper(user.Name))
	fmt.Printf("User Email: %s\n", strings.ToLower(user.Email))

	return nil
}

func main() {
	err := fetchAndProcessUser(1)
	if err != nil {
		fmt.Printf("Fetch Error: %v\n", err)
	}
}
\ No newline at end of file