package reportservice

import (
	"fmt"
	"os"
	"path/filepath"
	"time"
)

type User struct {
	ID       int
	Name     string
	IsActive bool
}

type Transaction struct {
	ID     int
	UserID int
	Amount float64
}

type ReportService struct{}

func (rs *ReportService) generateMonthlyReport(users []User, transactions []Transaction) error {
	activeUsers := []User{}
	for _, user := range users {
		if user.IsActive {
			activeUsers = append(activeUsers, user)
		}
	}
	fmt.Printf("Active Users Count: %d\n", len(activeUsers))

	var totalAmount float64
	for _, tx := range transactions {
		totalAmount += tx.Amount
	}
	fmt.Printf("Total Transactions Amount: $%.2f\n", totalAmount)

	reportContent := fmt.Sprintf("Monthly Report\n================\nActive Users: %d\nTotal Transactions: $%.2f\n",
		len(activeUsers), totalAmount)

	reportsDir := filepath.Join(".", "reports")
	if err := os.MkdirAll(reportsDir, 0755); err != nil {
		return fmt.Errorf("failed to create reports directory: %v", err)
	}

	month := time.Now().Month()
	filePath := filepath.Join(reportsDir, fmt.Sprintf("monthly_report_%d.txt", month))
	if err := os.WriteFile(filePath, []byte(reportContent), 0644); err != nil {
		return fmt.Errorf("failed to write report file: %v", err)
	}
	fmt.Printf("Report saved to %s\n", filePath)

	rs.sendNotification(fmt.Sprintf("Monthly report generated: %s", filePath))
	return nil
}

func (rs *ReportService) sendNotification(message string) {
	fmt.Printf("Notification: %s\n", message)
}

func main() {
	users := []User{
		{ID: 1, Name: "Alice", IsActive: true},
		{ID: 2, Name: "Bob", IsActive: false},
		{ID: 3, Name: "Charlie", IsActive: true},
	}

	transactions := []Transaction{
		{ID: 101, UserID: 1, Amount: 250},
		{ID: 102, UserID: 3, Amount: 450},
		{ID: 103, UserID: 1, Amount: 150},
	}

	reportService := &ReportService{}
	reportService.generateMonthlyReport(users, transactions)
}
\ No newline at end of file