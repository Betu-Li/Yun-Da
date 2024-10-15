package main

import (
	"Yun-Da/pkg/dao/mysql"
	"Yun-Da/pkg/logger"
	"Yun-Da/pkg/routers"
	settings "Yun-Da/pkg/setting"
	"fmt"
	"github.com/pkg/errors"
	"go.uber.org/zap"
	"golang.org/x/net/context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	// 加载配置
	if err := settings.Init(); err != nil {
		fmt.Println("init settings failed, err:", err)
		return
	}

	// 初始化日志
	if err := logger.Init(settings.Conf.Log); err != nil {
		fmt.Println("init logger failed, err:", err)
		return
	}
	defer logger.Lg.Sync() // 把缓冲区的日志追加到日志文件中
	logger.Lg.Info("logger init success")

	// 初始化MySql连接
	if err := mysql.Init(settings.Conf.MySQL); err != nil {
		fmt.Println("init mysql failed, err:", err)
		return
	}
	defer mysql.Close()

	//注册路由
	r := routers.Setup()

	// 启动服务
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", settings.Conf.Server.Port),
		Handler: r,
	}
	go func() {
		// 开启一个goroutine启动服务
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutdown Server ...")
	// 创建一个5秒超时的context
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Lg.Fatal("Server Shutdown: ", zap.Error(err))
	}
	logger.Lg.Info("Server exiting")
}
