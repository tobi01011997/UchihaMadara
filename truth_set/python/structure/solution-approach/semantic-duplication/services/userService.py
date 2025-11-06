from datetime import datetime
from ..utils.dateUtils import format_date

class UserService:
    def __init__(self):
        self.users = []
    
    def add_user(self, name):
        new_user = {
            'id': len(self.users) + 1,
            'name': name,
            'registration_date': datetime.now()
        }
        self.users.append(new_user)
        print(f"User Added: {new_user['name']}, Registered On: {format_date(new_user['registration_date'], 'MM/DD/YYYY')}")
    
    def list_users(self):
        for user in self.users:
            print(f"ID: {user['id']}, Name: {user['name']}, Registration Date: {format_date(user['registration_date'])}")
\ No newline at end of file