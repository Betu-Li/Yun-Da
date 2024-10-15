package settings

import (
	"fmt"
	"github.com/fsnotify/fsnotify"
	"github.com/spf13/viper"
)

type Config struct {
	Server *ServerConfig `mapstructure:"app"`
	Log    *LogConfig    `mapstructure:"log"`
	MySQL  *MySQLConfig  `mapstructure:"mysql"`
}

type ServerConfig struct {
	Name  string `mapstructure:"name"`
	Model string `mapstructure:"model"`
	Port  int    `mapstructure:"port"`
}

type LogConfig struct {
	Level      string `mapstructure:"level"`
	FileName   string `mapstructure:"filename"`
	MaxSize    int    `mapstructure:"max_size"`
	MaxAge     int    `mapstructure:"max_age"`
	MaxBackups int    `mapstructure:"max_backups"`
}

type MySQLConfig struct {
	Host         string `mapstructure:"host"`
	Port         int    `mapstructure:"port"`
	User         string `mapstructure:"user"`
	Password     string `mapstructure:"password"`
	DBName       string `mapstructure:"dbname"`
	MaxOpenConns int    `mapstructure:"max_open_conns"`
	MaxIdleConns int    `mapstructure:"max_idle_conns"`
}

// Conf 全局的配置变量
var Conf = new(Config)

// Init 初始化配置文件
func Init() (err error) {
	viper.SetConfigFile("pkg/conf/config.yaml")

	err = viper.ReadInConfig() // 查找并读取配置文件
	if err != nil {
		panic(fmt.Errorf("viper.ReadInConfig() failed: %v \n ", err))
		return
	}
	// 将读取的配置信息反序列化到 Conf 变量
	if err := viper.Unmarshal(Conf); err != nil {
		fmt.Printf("unmarshal conf failed, err:%s \n", err)
	}
	// 监控配置文件变化
	viper.WatchConfig()
	viper.OnConfigChange(func(in fsnotify.Event) {
		fmt.Println("配置文件修改了")
		if err := viper.Unmarshal(Conf); err != nil {
			fmt.Printf("unmarshal conf failed, err:%s \n", err)
		}
	})
	return
}
