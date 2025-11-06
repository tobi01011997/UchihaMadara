from typing import List, Dict, Optional, Union
from db import Database

class User:
    def __init__(self, id: int, name: str, email: str):
        self.id = id
        self.name = name
        self.email = email

db = Database()

def get_all_users() -> Dict[str, Optional[Union[List[User], str]]]:
    """
    Fetches all users from the database using deprecated query method.
    """
    result = db.query('SELECT id, name, email FROM users;')
    return result

def add_user(name: str, email: str) -> Dict[str, Optional[Union[List, str]]]:
    """
    Adds a new user to the database using deprecated query method.
    """
    result = db.query('INSERT INTO users (name, email) VALUES (%s, %s);', [name, email])
    return result

def get_all_users_new() -> Dict[str, Optional[Union[List[User], str]]]:
    """
    Fetches all users from the database using new execute_query method.
    """
    result = db.execute_query('SELECT id, name, email FROM users;')
    return result

def add_user_new(name: str, email: str) -> Dict[str, Optional[Union[List, str]]]:
    """
    Adds a new user to the database using new execute_query method.
    """
    result = db.execute_query('INSERT INTO users (name, email) VALUES (%s, %s);', [name, email])
    return result

if __name__ == "__main__":
    users_old = get_all_users()
    if users_old["success"]:
        print('Users (Old):', users_old["data"])
    else:
        print('Error fetching users (Old):', users_old["error"])

    add_user_result_old = add_user('John Doe', 'john.doe@example.com')
    if add_user_result_old["success"]:
        print('User added successfully (Old).')
    else:
        print('Error adding user (Old):', add_user_result_old["error"])

    users_new = get_all_users_new()
    if users_new["success"]:
        print('Users (New):', users_new["data"])
    else:
        print('Error fetching users (New):', users_new["error"])

    add_user_result_new = add_user_new('Jane Doe', 'jane.doe@example.com')
    if add_user_result_new["success"]:
        print('User added successfully (New).')
    else:
        print('Error adding user (New):', add_user_result_new["error"])
\ No newline at end of file