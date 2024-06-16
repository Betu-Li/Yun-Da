const cloud = require('wx-server-sdk')
const db = cloud.database()
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

exports.main = async (event, context) => {
    var username=event.username
    var time=event.time
    var car=event.car
    var distance=event.distance
    var price=event.price
    var from=event.from
    var to=event.to
    var time=event.time
    var mybackfill=event.mybackfill
    var tobackfill=event.tobackfill

    await db.collection('order').add({
        data: {
            username: username,
            car: car,
            distance: distance,
            price: price,
            from: from,
            to: to,
            time: time,
            mybackfill: mybackfill,
            tobackfill: tobackfill
        }
    });

    return {
        code: 0,
        message: 'Order created successfully'
    };
}


