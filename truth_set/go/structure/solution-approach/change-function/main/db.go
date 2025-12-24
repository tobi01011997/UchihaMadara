package main

import (
	"database/sql"
	"log"
	"time"
	_ "github.com/lib/pq"
)

var pool *sql.DB

func init() {
	var err error
	connStr := "user=your_db_user password=your_db_password dbname=your_db_name host=localhost port=5432 sslmode=disable"
	pool, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
}

type DBResult struct {
	Success bool
	Data    interface{}
	Error   string
}

// Deprecated: Use ExecuteQuery instead. This function will be removed in future releases.
func Query(sqlQuery string, params ...interface{}) DBResult {
	log.Println("Warning: `Query` is deprecated. Please use `ExecuteQuery` instead.")
	rows, err := pool.Query(sqlQuery, params...)
	if err != nil {
		log.Printf("Database query failed: %v\n", err)
		return DBResult{
			Success: false,
			Data:    nil,
			Error:   err.Error(),
		}
	}
	defer rows.Close()

	return DBResult{
		Success: true,
		Data:    rows,
	}
}

// ExecuteQuery executes a SQL query with enhanced logging and error handling.
func ExecuteQuery(sqlQuery string, params ...interface{}) DBResult {
	startTime := time.Now()
	log.Printf("[Query Start] Executing SQL Query at %v\n", startTime.Format(time.RFC3339))
	log.Printf("[Query Details] SQL: %s\n", sqlQuery)
	log.Printf("[Query Params] Parameters: %v\n", params)

	rows, err := pool.Query(sqlQuery, params...)
	duration := time.Since(startTime)

	if err != nil {
		log.Printf("[Query Error] Database query failed after %v: %v\n", duration, err)
		log.Printf("[Query Stack] Error occurred while executing: %s\n", sqlQuery)
		if len(params) > 0 {
			log.Printf("[Query Stack] Query parameters: %v\n", params)
		}
		return DBResult{
			Success: false,
			Data:    nil,
			Error:   err.Error(),
		}
	}
	defer rows.Close()

	log.Printf("[Query Success] Query executed successfully in %v\n", duration)
	log.Printf("[Query Metrics] Query duration: %v milliseconds\n", duration.Milliseconds())
	
	return DBResult{
		Success: true,
		Data:    rows,
	}
}
\ No newline at end of file