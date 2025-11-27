package services

import (
	"fmt"
	"time"
	"main/utils"
)

type User struct {
	ID               int
	Name             string
	RegistrationDate time.Time
}

type UserService struct {
	users []User
}

func NewUserService() *UserService {
	return &UserService{users: make([]User, 0)}
}

func (s *UserService) AddUser(name string) {
	newUser := User{
		ID:               len(s.users) + 1,
		Name:             name,
		RegistrationDate: time.Now(),
	}
	s.users = append(s.users, newUser)
	fmt.Printf("User Added: %s, Registered On: %s\n",
		newUser.Name, utils.FormatDate(newUser.RegistrationDate, "MM/DD/YYYY"))
}

func (s *UserService) ListUsers() {
	for _, user := range s.users {
		fmt.Printf("ID: %d, Name: %s, Registration Date: %s\n",
			user.ID, user.Name, utils.FormatDate(user.RegistrationDate, "YYYY-MM-DD"))
	}
}
\ No newline at end of file