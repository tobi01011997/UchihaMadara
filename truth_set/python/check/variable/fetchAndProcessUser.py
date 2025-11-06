import aiohttp

async def fetch_and_process_user(user_id):
    async with aiohttp.ClientSession() as session:
        async with session.get(f"https://api.example.com/users/{user_id}") as response:
            data = await response.json()
            
            user = data
            
            print(f"User Name: {user['name'].upper()}")
            print(f"User Email: {user['email'].lower()}")

async def main():
    try:
        await fetch_and_process_user(1)
    except Exception as error:
        print("Fetch Error:", error)

import asyncio
asyncio.run(main())
\ No newline at end of file