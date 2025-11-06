import asyncio

class ConfigManager:
    _instance = None
    
    def __init__(self):
        self.config = None
        asyncio.create_task(self.load_config())
    
    @classmethod
    def get_instance(cls):
        if not cls._instance:
            cls._instance = ConfigManager()
        return cls._instance
    
    async def load_config(self):
        await asyncio.sleep(1)
        self.config = {"api_url": "https://api.example.com"}
        print(f"Config loaded: {self.config}")

async def main():
    config = ConfigManager.get_instance()
    print(f"API URL: {config.config['api_url']}")

asyncio.run(main())
\ No newline at end of file