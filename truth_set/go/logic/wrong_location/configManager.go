package wrong_location

import (
    "fmt"
    "sync"
    "time"
)

type ConfigManager struct {
    config map[string]string
}

var instance *ConfigManager
var once sync.Once

func GetInstance() *ConfigManager {
    once.Do(func() {
        instance = &ConfigManager{}
        go instance.loadConfig() 
    })
    return instance
}

func (cm *ConfigManager) loadConfig() {
    time.Sleep(1 * time.Second)
    cm.config = map[string]string{
        "apiUrl": "https://api.example.com",
    }
    fmt.Println("Config loaded:", cm.config)
}

func main() {
    config := GetInstance()
    fmt.Println("API URL:", config.config["apiUrl"])
}
\ No newline at end of file