const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();


exports.main = async (event, context) => {
  var username=event.username
  var password=event.password
  var sex = event.sex
  var birth = event.birth
  var address = event.address
  var phone = event.phone
  // 检查用户名是否已存在
  const queryResult = await db.collection('user').where({
    username: username
  }).get();

  if (queryResult.data.length > 0) {
    // 用户名已存在，处理错误或返回适当的响应
    return {
      code: -1,
      message: 'Username already exists'
    };
  }

  // 添加用户到数据库
  await db.collection('user').add({
    data: {
      username: username,
      password: password,
      sex: sex,
      birth: birth,
      address: address,
      phone: phone
    }
  });

  // 返回成功消息
  return {
    code: 0,
    message: 'User created successfully'
  };
};