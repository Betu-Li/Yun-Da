const cloud = require('wx-server-sdk');
const { key } = require('../config.json');
var request = require('request');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  var from = event.from
  var to = event.to
  var api = "https://apis.map.qq.com/ws/direction/v1/driving/?"
  return new Promise((resolve, reject) => {
    //调用request
    request({
      url: api+'key='+key+'&from='+from+'&to='+to,      //请求地址
      method: "GET",   //GET或POST请求
      json: true,      //返回的body结果为json格式
    }, function (error, response, body) {
        console.info("HTTP - POST")
        console.info(body)
        if (response.statusCode === 200 && !error) {
          var result = body.result
          resolve(result)
        }
     })
  })
}