"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var ReportService = /** @class */ (function () {
    function ReportService() {
    }
    ReportService.prototype.generateMonthlyReport = function (users, transactions) {
        var activeUsers = users.filter(function (user) { return user.isActive; });
        console.log("Active Users Count: ".concat(activeUsers.length));
        var totalAmount = 0;
        transactions.forEach(function (tx) {
            totalAmount += tx.amount;
        });
        console.log("Total Transactions Amount: $".concat(totalAmount));
        var reportContent = "Monthly Report\n================\nActive Users: ".concat(activeUsers.length, "\nTotal Transactions: $").concat(totalAmount, "\n");
        var reportsDir = path.join(__dirname, 'reports');
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir);
        }
        var filePath = path.join(reportsDir, "monthly_report_".concat(new Date().getMonth() + 1, ".txt"));
        fs.writeFileSync(filePath, reportContent);
        console.log("Report saved to ".concat(filePath));
        this.sendNotification("Monthly report generated: ".concat(filePath));
    };
    ReportService.prototype.sendNotification = function (message) {
        console.log("Notification: ".concat(message));
    };
    return ReportService;
}());
var users = [
    { id: 1, name: 'Alice', isActive: true },
    { id: 2, name: 'Bob', isActive: false },
    { id: 3, name: 'Charlie', isActive: true },
];
var transactions = [
    { id: 101, userId: 1, amount: 250 },
    { id: 102, userId: 3, amount: 450 },
    { id: 103, userId: 1, amount: 150 },
];
var reportService = new ReportService();
reportService.generateMonthlyReport(users, transactions);