const cloud = require('wx-server-sdk');
const db = cloud.database();
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
    var username = event.username
    return await db.collection('order').where({
        username: username
    }).get();
}