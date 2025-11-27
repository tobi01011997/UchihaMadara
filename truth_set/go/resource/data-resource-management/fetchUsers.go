package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

func fetchUsers() {
	db, err := sql.Open("postgres", "postgres://dbuser:secretpassword@localhost:5432/mydb?sslmode=disable")
	if err != nil {
		fmt.Printf("Error connecting to database: %v\n", err)
		return
	}

	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		fmt.Printf("Error querying users: %v\n", err)
		return
	}

	var id int
	var name string
	for rows.Next() {
		err := rows.Scan(&id, &name)
		if err != nil {
			fmt.Printf("Error scanning row: %v\n", err)
			continue
		}
		fmt.Printf("User %d: %s\n", id, name)
	}
}

func main() {
	fetchUsers()
}
\ No newline at end of file