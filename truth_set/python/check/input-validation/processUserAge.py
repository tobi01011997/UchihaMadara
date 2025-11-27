def process_user_age(age):
    try:
        numeric_age = int(age)
        if numeric_age >= 18:
            print("User is an adult.")
        else:
            print("User is a minor.")
    except (ValueError, TypeError):
        print("Error: Invalid age input. Please provide a valid number.")

process_user_age("twenty")
process_user_age(None)