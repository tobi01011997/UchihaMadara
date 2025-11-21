import * as fs from 'fs';
import * as path from 'path';

interface User {
    id: number;
    name: string;
    isActive: boolean;
}

interface Transaction {
    id: number;
    userId: number;
    amount: number;
}

class ReportService {
    generateMonthlyReport(users: User[], transactions: Transaction[]): void {
        const activeUsers = users.filter(user => user.isActive);
        console.log(`Active Users Count: ${activeUsers.length}`);

        let totalAmount = 0;
        transactions.forEach(tx => {
            totalAmount += tx.amount;
        });
        console.log(`Total Transactions Amount: $${totalAmount}`);

        let reportContent = `Monthly Report\n================\nActive Users: ${activeUsers.length}\nTotal Transactions: $${totalAmount}\n`;

        const reportsDir = path.join(__dirname, 'reports');
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir);
        }
        const filePath = path.join(reportsDir, `monthly_report_${new Date().getMonth() + 1}.txt`);
        fs.writeFileSync(filePath, reportContent);
        console.log(`Report saved to ${filePath}`);

        this.sendNotification(`Monthly report generated: ${filePath}`);
    }

    private sendNotification(message: string): void {
        console.log(`Notification: ${message}`);
    }
}

const users: User[] = [
    { id: 1, name: 'Alice', isActive: true },
    { id: 2, name: 'Bob', isActive: false },
    { id: 3, name: 'Charlie', isActive: true },
];

const transactions: Transaction[] = [
    { id: 101, userId: 1, amount: 250 },
    { id: 102, userId: 3, amount: 450 },
    { id: 103, userId: 1, amount: 150 },
];

const reportService = new ReportService();
reportService.generateMonthlyReport(users, transactions);
\ No newline at end of file