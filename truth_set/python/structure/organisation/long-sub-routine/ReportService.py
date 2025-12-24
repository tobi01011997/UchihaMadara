import os
from datetime import datetime

class ReportService:
    def __init__(self):
        pass
        
    def generate_monthly_report(self, users, transactions):
        active_users = [user for user in users if user['is_active']]
        print(f"Active Users Count: {len(active_users)}")

        total_amount = 0
        for tx in transactions:
            total_amount += tx['amount']
        print(f"Total Transactions Amount: ${total_amount}")

        report_content = f"""Monthly Report
================
Active Users: {len(active_users)}
Total Transactions: ${total_amount}
"""

        reports_dir = os.path.join(os.path.dirname(__file__), 'reports')
        if not os.path.exists(reports_dir):
            os.makedirs(reports_dir)
            
        file_path = os.path.join(reports_dir, f"monthly_report_{datetime.now().month}.txt")
        with open(file_path, 'w') as f:
            f.write(report_content)
            
        print(f"Report saved to {file_path}")

        self.send_notification(f"Monthly report generated: {file_path}")

    def send_notification(self, message):
        print(f"Notification: {message}")


# Test data
users = [
    {'id': 1, 'name': 'Alice', 'is_active': True},
    {'id': 2, 'name': 'Bob', 'is_active': False}, 
    {'id': 3, 'name': 'Charlie', 'is_active': True}
]

transactions = [
    {'id': 101, 'user_id': 1, 'amount': 250},
    {'id': 102, 'user_id': 3, 'amount': 450},
    {'id': 103, 'user_id': 1, 'amount': 150}
]

# Generate report
report_service = ReportService()
report_service.generate_monthly_report(users, transactions)