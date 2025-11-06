import asyncio
import aiofiles

async def read_from_database():
    await asyncio.sleep(3)  # Simulating a large database call
    return "Hello from the Database!"

async def write_file(data):
    async with aiofiles.open('message.txt', 'w') as f:
        await f.write(data)
        print("Write in progress...")
        await asyncio.sleep(5)  # Simulate a slow write process
        print("Write completed.")

async def read_file():
    try:
        async with aiofiles.open('message.txt', 'r') as f:
            print("Attempting to read file...")
            content = await f.read()
            print(f"File Content: {content}")
    except FileNotFoundError:
        print("File not found during read.")

async def write_and_read():
    data = await read_from_database()
    
    write_task = asyncio.create_task(write_file(data))
    read_task = asyncio.create_task(read_file())
    
    await asyncio.gather(write_task, read_task)

async def main():
    await write_and_read()

if __name__ == "__main__":
    asyncio.run(main())
\ No newline at end of file