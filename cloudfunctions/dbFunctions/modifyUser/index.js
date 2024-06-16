const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
    var username=event.username
    var password=event.password
    var sex = event.sex
    var birth = event.birth
    var address = event.address
    var phone = event.phone
    // 修改用户信息
    await db.collection('user').where({
        username:username,
        password:password
    }).update({
        data: {
            sex: sex,
            birth: birth,
            address: address,
            phone: phone
        }
    });

    return {
        code: 0,
        message: 'User modified successfully'
    };
};

