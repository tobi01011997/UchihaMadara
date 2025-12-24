import asyncio

class UserProfile:
    data = None
    def __init__(self):
        asyncio.create_task(self.fetch_data())
    
    async def fetch_data(self):
        await asyncio.sleep(1)
        self.data = {"name": "Alice"}
        print(f"Data fetched: {self.data}")
    
    def print_data(self):
        print(f"User Data: {self.data}")

async def main():
    profile = UserProfile()
    profile.print_data()

asyncio.run(main())
\ No newline at end of file