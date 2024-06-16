// 云函数入口文件
const cloud = require('wx-server-sdk')
const selectUser = require('./selectUser/index')
const createUser = require('./createUser/index')
const createOrder = require('./createOrder/index')
const selectOrder = require('./selectOrder/index')
const modifyUser = require('./modifyUser/index')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  switch (event.type) {
    case 'selectUser':
      return await selectUser.main(event,context);
    case 'createUser':
      return await createUser.main(event,context);
    case 'createOrder':
      return await createOrder.main(event,context);
    case 'selectOrder':
      return await selectOrder.main(event,context);
    case 'modifyUser':
      return await modifyUser.main(event,context);
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}