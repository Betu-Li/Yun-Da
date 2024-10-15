package models

import (
	"Yun-Da/pkg/dao/mysql"
	"fmt"
	"go.uber.org/zap"
)

type User struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Birth    string `json:"birth"`
	Sex      string `json:"sex"`
	Address  string `json:"address"`
}

// CreateUser 新增用户
func CreateUser(user *User) (err error) {
	sqlStr := "insert into user(username, password) values (?,?)"
	_, err = mysql.Db.Exec(sqlStr, user.Username, user.Password)
	if err != nil {
		zap.L().Info("insert failed", zap.Error(err))
		fmt.Printf("insert failed, err:%v\n", err)
		return
	}
	return
}

// GetUserByUsername 根据用户名获取用户
func GetUserByUsername(username string) (user *User, err error) {
	user = new(User)
	sqlStr := "select username from user where username=?"
	err = mysql.Db.Get(user, sqlStr, username)
	if err != nil {
		zap.L().Info("get user failed", zap.Error(err))
		fmt.Printf("get user failed, err:%v\n", err)
		return nil, err
	}
	return
}
