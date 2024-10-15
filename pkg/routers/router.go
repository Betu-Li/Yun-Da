package routers

import (
	"Yun-Da/pkg/logger"
	"github.com/gin-gonic/gin"
)

func Setup() *gin.Engine {
	r := gin.Default()
	r.Use(logger.GinLogger(), logger.GinRecovery(true))

	return r
}
