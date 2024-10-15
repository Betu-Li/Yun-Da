package controllers

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io"
	"io/ioutil"
	"net/http"
)

type MapController struct{}

// PathResponse 路径计算响应
type PathResponse struct {
	Status    int    `json:"status"`
	Message   string `json:"message"`
	RequestID string `json:"request_id"`
	Result    Result `json:"result"`
}

// Result 路径计算结果
type Result struct {
	Routes []Route `json:"routes"`
}

// Route 路径
type Route struct {
	Distance int      `json:"distance"` // 距离
	Polyline []string `json:"polyline"` // 路线
}

// PathCal 路径计算
func (mp MapController) PathCal(c *gin.Context) {
	from := c.PostForm("from")
	to := c.PostForm("to")
	var api = "https://apis.map.qq.com/ws/direction/v1/driving/?"
	key := "6LEBZ-NFCK7-TQNXU-P6DHD-K5DC5-WWF7D"
	url := api + "from=" + from + "&to=" + to + "&key=" + key

	// 验证参数
	if from == "" || to == "" {
		ReturnError(c, 4001, "请选择正确的地址")
		return
	}

	// 发起http请求，获取路径信息
	resp, err := http.Get(url)
	if err != nil {
		ReturnError(c, 4004, "发起路径计算请求失败")
		return
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			ReturnError(c, 4004, "关闭响应体失败")
			return
		}
	}(resp.Body)

	// 读取响应体
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		ReturnError(c, 4004, "路径计算失败")
		return
	}

	// 将JSON响应解包到结构中
	var pathResponse PathResponse
	err = json.Unmarshal(body, &pathResponse)
	if err != nil {
		ReturnError(c, 4004, "解析路径计算结果失败")
		return
	}

	if pathResponse.Status != 0 {
		ReturnError(c, 4004, "路径计算失败: "+pathResponse.Message)
		return
	}

	// Get the distance and polyline from the first route
	if len(pathResponse.Result.Routes) > 0 {
		distance := pathResponse.Result.Routes[0].Distance
		polyline := pathResponse.Result.Routes[0].Polyline
		data := map[string]interface{}{
			"distance": distance,
			"polyline": polyline,
		}
		ReturnSuccess(c, 200, "路径计算成功", data, 0)
	} else {
		ReturnError(c, 4004, "未找到路线")
	}
}
