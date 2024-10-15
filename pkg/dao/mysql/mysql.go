package mysql

import (
	"Yun-Da/pkg/logger"
	settings "Yun-Da/pkg/setting"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"go.uber.org/zap"
)

var Db *sqlx.DB

func Init(cfg *settings.MySQLConfig) (err error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		cfg.User,
		cfg.Password,
		cfg.Host,
		cfg.Port,
		cfg.DBName)
	Db, err = sqlx.Connect("mysql", dsn)
	if err != nil {
		logger.Lg.Error("connect DB failed", zap.Error(err))
		return
	}
	Db.SetMaxOpenConns(cfg.MaxOpenConns)
	Db.SetMaxIdleConns(cfg.MaxIdleConns)
	return
}

func Close() {
	_ = Db.Close()
}
