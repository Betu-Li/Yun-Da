// 云函数入口文件
const cloud = require('wx-server-sdk')
const path = require('./path/index')
const getsugguest  = require('./getsuggest/index')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  switch (event.type) {
    case 'path':
      return await path.main(event,context);
    case 'getsuggest':
      return await getsugguest.main(event,context);
    
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}