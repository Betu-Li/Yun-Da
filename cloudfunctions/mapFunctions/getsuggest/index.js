const cloud = require('wx-server-sdk');
const { key } = require('../config.json');
var request = require('request');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});



exports.main = async (event, context) => {
    var keyword = encodeURIComponent(event.keyword);// 使用encodeURIComponent函数转义。
    var url = `https://apis.map.qq.com/ws/place/v1/suggestion?keyword=${keyword}&key=${key}`;
    return new Promise((resolve, reject) => {
      //调用request
      request({
        url: url ,    //请求地址
        method: "GET",   //GET或POST请求
        json: true,      //返回的body结果为json格式
      }, function (error, response, body) {
            console.info("HTTP - POST")
            console.info(body)
            if (error) {
                reject(error);
            } else if (response.statusCode === 200) {
                var result = body.data
                resolve(result)
            } else {
                reject(new Error('Unexpected status code: ' + response.statusCode));
            }
        })
    })
}