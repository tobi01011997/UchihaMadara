from datetime import datetime
import random
import string

def create_user(name: str, age: int) -> dict:
    user = {
        'id': generate_unique_id(),
        'name': name,
        'age': age,
        'is_active': True
    }
    database.save(user)
    return user

def add_user(name: str, age: int) -> dict:
    user = {
        'id': generate_unique_id(),
        'name': name,
        'age': age,
        'is_active': True
    }
    database.save(user)
    return user

def update_user_email(user_id: str, email: str) -> None:
    user = database.find_user_by_id(user_id)
    if user:
        user['email'] = email
        user['updated_at'] = datetime.now()
        user['has_email_changed'] = True
        database.save(user)

def update_user_phone(user_id: str, phone: str) -> None:
    user = database.find_user_by_id(user_id)
    if user:
        user['phone'] = phone
        user['updated_at'] = datetime.now()
        user['has_phone_changed'] = True
        database.save(user)

def is_adult(age: int) -> bool:
    return age >= 18

def can_vote(age: int) -> bool:
    if age >= 18:
        return True
    return False

def can_drink(age: int) -> bool:
    if age >= 21:
        return True
    return False

def calculate_discount(price: float) -> float:
    discount_rate = 0.1
    return price * discount_rate

def calculate_tax(price: float) -> float:
    tax_rate = 0.1
    return price * tax_rate

class Database:
    def save(self, user: dict) -> None:
        print(f"User {user['id']} saved.")
        
    def find_user_by_id(self, id: str) -> dict:
        return None

database = Database()

def generate_unique_id() -> str:
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=9))