package main

import (
	"fmt"
	"log"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func getAllUsers() DBResult {
	result := Query("SELECT id, name, email FROM users;")
	return result
}

func addUser(name, email string) DBResult {
	result := Query("INSERT INTO users (name, email) VALUES ($1, $2);", name, email)
	return result
}

func main() {
	usersOld := getAllUsers()
	if usersOld.Success {
		fmt.Println("Users (Old):", usersOld.Data)
	} else {
		log.Printf("Error fetching users (Old): %s\n", usersOld.Error)
	}

	addUserResultOld := addUser("John Doe", "john.doe@example.com")
	if addUserResultOld.Success {
		fmt.Println("User added successfully (Old).")
	} else {
		log.Printf("Error adding user (Old): %s\n", addUserResultOld.Error)
	}
}
\ No newline at end of file