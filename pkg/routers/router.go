package routers

import (
	"Yun-Da/pkg/logger"
	"Yun-Da/pkg/routers/controllers"
	"github.com/gin-gonic/gin"
)

func Setup() *gin.Engine {
	r := gin.Default()
	r.Use(logger.GinLogger(), logger.GinRecovery(true))

	user := r.Group("/user")
	{
		user.POST("/register", controllers.UserController{}.Register)
		user.POST("/login", controllers.UserController{}.Login)
	}

	order := r.Group("/order")
	{
		order.POST("/create", controllers.OrderController{}.Create)
		order.POST("/list", controllers.OrderController{}.List)
	}

	mp := r.Group("/map")
	{
		mp.POST("/path", controllers.MapController{}.PathCal)
	}

	return r
}
