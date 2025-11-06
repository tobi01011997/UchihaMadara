users = [
    {"id": i + 1, "email": f"user{i + 1}@example.com"}
    for i in range(100000)
]

emails_to_find = ['user100@example.com', 'user200@example.com', 'user300@example.com']

for email in emails_to_find:
    user = next((u for u in users if u['email'] == email), None)
    if user:
        print(user['id'])
\ No newline at end of file