def get_user_name(user_id):
    if user_id == 1:
        return {"name": "Alice", "error": None}
    else:
        return {"name": None, "error": "User not found."}

result = get_user_name(2)
print("User Name:", result["name"].upper())