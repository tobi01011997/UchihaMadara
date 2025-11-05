class ConfigManager {
    private static instance: ConfigManager;
    config: any;

    private constructor() {}

    static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
            ConfigManager.instance.loadConfig();
        }
        return ConfigManager.instance;
    }

    async loadConfig() {
        this.config = await new Promise(resolve => setTimeout(() => resolve({ apiUrl: 'https://api.example.com' }), 1000));
        console.log('Config loaded:', this.config);
    }
}

const config = ConfigManager.getInstance();
console.log('API URL:', config.config.apiUrl);
\ No newline at end of file