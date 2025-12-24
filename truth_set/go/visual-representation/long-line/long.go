package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type User struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Age       int    `json:"age"`
	Address   string `json:"address"`
}

type UserDetails struct {
	User
	Preferences map[string]interface{} `json:"preferences"`
	History     map[string]interface{} `json:"history"`
	Settings    map[string]interface{} `json:"settings"`
}

type UserService struct {
	client *http.Client
}

func (s *UserService) CreateUser(username, password, email, firstName, lastName string, age int, address string) (*User, error) {
	url := fmt.Sprintf("https://api.example.com/users/create?username=%s&password=%s&email=%s&firstName=%s&lastName=%s&age=%d&address=%s",
		username, password, email, firstName, lastName, age, address)
	
	resp, err := s.client.Post(url, "application/json", nil)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var user User
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *UserService) GetUserDetails(userID int) (*UserDetails, error) {
	url := fmt.Sprintf("https://api.example.com/users/details?userId=%d&includePreferences=true&includeHistory=true&includeSettings=true", userID)
	
	resp, err := s.client.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var details UserDetails
	if err := json.NewDecoder(resp.Body).Decode(&details); err != nil {
		return nil, err
	}
	return &details, nil
}

func main() {
	service := &UserService{client: &http.Client{}}

	user, err := service.CreateUser("john_doe", "securepassword", "john@example.com", "John", "Doe", 30, "123 Main St")
	if err != nil {
		fmt.Printf("Error creating user: %v\n", err)
		return
	}
	fmt.Printf("User created: %+v\n", user)

	details, err := service.GetUserDetails(1)
	if err != nil {
		fmt.Printf("Error getting user details: %v\n", err)
		return
	}
	fmt.Printf("User details: %+v\n", details)
}
\ No newline at end of file