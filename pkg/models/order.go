package models

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"go.uber.org/zap"
)

type Order struct {
	Id         int    `json:"id"`
	Username   string `json:"username"`
	Car        string `json:"carType"`
	Distance   int    `json:"distance"`
	Price      int    `json:"price"`
	From       string `json:"from"`
	To         string `json:"to"`
	Time       string `json:"time"`
	Mybackfill string `json:"mybackfill"`
	Tobackfill string `json:"tobackfill"`
}

// CreateOrder 新增订单
func CreateOrder(db *sqlx.DB, order *Order) (err error) {
	sqlStr := "insert into order(username, carType, distance, price, from, to, time, mybackfill, tobackfill) values (?,?,?,?,?,?,?,?,?)"
	_, err = db.Exec(sqlStr, order.Username, order.Car, order.Distance, order.Price, order.From, order.To, order.Time, order.Mybackfill, order.Tobackfill)
	if err != nil {
		zap.L().Info("insert failed", zap.Error(err))
		fmt.Printf("insert failed, err:%v\n", err)
		return
	}
	return
}

// GetOrderListByUsername 根据用户名获取订单列表
func GetOrderListByUsername(db *sqlx.DB, username string) ([]Order, error) {
	var orderList []Order
	sqlStr := "select id, username, carType, distance, price, from, to, time, mybackfill, tobackfill from order where username=?"
	err := db.Select(&orderList, sqlStr, username)
	if err != nil {
		zap.L().Info("get order list failed", zap.Error(err))
		fmt.Printf("get order list failed, err:%v\n", err)
		return nil, err
	}
	return orderList, nil
}
