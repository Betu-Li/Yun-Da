package jwt

import (
	"errors"
	"github.com/golang-jwt/jwt/v5"
	"time"
)

// CustomClaims 自定义声明
type CustomClaims struct {
	Username             string `json:"username"`
	jwt.RegisteredClaims        // 内嵌标准的声明
}

// CustomSecret 用于加盐的字符串
var CustomSecret = []byte("用于签名的字符串")

// TokenExpireDuration token过期时间
const TokenExpireDuration = time.Hour * 1

// GenToken 生成JWT
func GenToken(username string) (string, error) {
	claims := CustomClaims{
		username, // 自定义字段
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(TokenExpireDuration)),
			Issuer:    "yun_da",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(CustomSecret)
}

// ParseToken 解析JWT
func ParseToken(tokenString string) (*CustomClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return CustomSecret, nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, errors.New("invalid token")
}
