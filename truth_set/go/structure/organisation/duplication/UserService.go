package userservice

import (
	"fmt"
	"math/rand"
	"time"
)

type User struct {
	ID             string
	Name           string
	Age            int
	IsActive       bool
	Email          string
	Phone          string
	UpdatedAt      time.Time
	HasEmailChanged bool
	HasPhoneChanged bool
}

type Database struct{}

func (db *Database) Save(user *User) {
	fmt.Printf("User %s saved.\n", user.ID)
}

func (db *Database) FindUserById(id string) *User {
	return nil
}

func generateUniqueId() string {
	return fmt.Sprintf("%x", rand.Int())
}

func CreateUser(name string, age int) *User {
	user := &User{
		ID:       generateUniqueId(),
		Name:     name,
		Age:      age,
		IsActive: true,
	}
	db := &Database{}
	db.Save(user)
	return user
}

func AddUser(name string, age int) *User {
	user := &User{
		ID:       generateUniqueId(),
		Name:     name,
		Age:      age,
		IsActive: true,
	}
	db := &Database{}
	db.Save(user)
	return user
}

func UpdateUserEmail(userId string, email string) {
	db := &Database{}
	user := db.FindUserById(userId)
	if user != nil {
		user.Email = email
		user.UpdatedAt = time.Now()
		user.HasEmailChanged = true
		db.Save(user)
	}
}

func UpdateUserPhone(userId string, phone string) {
	db := &Database{}
	user := db.FindUserById(userId)
	if user != nil {
		user.Phone = phone
		user.UpdatedAt = time.Now()
		user.HasPhoneChanged = true
		db.Save(user)
	}
}

func IsAdult(age int) bool {
	return age >= 18
}

func CanVote(age int) bool {
	if age >= 18 {
		return true
	}
	return false
}

func CanDrink(age int) bool {
	if age >= 21 {
		return true
	}
	return false
}

func CalculateDiscount(price float64) float64 {
	discountRate := 0.1
	return price * discountRate
}

func CalculateTax(price float64) float64 {
	taxRate := 0.1
	return price * taxRate
}
\ No newline at end of file