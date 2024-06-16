// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      _id:'',
        car:'',
        distance:'',
        from:'',
        to:'',
        price:'',
        time:'',
        mybackfill:'',
        tobackfill:'',
    },
    latitude: '',
    longitude: ''
  },
 
  Path(){ //计算路径并绘制
    var _this = this;
    var from = this.data.order.from;
    var to = this.data.order.to;

    wx.cloud.callFunction({//调用云函数
      name:'mapFunctions',
      data:{
        type:'path',
        from:from,
        to:to
      },
      success:function(res){
        var result= res.result
        var route = result.routes[0]
        var coors = route.polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
          var kr = 1000000;
          for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          //将解压后的坐标放入点串数组pl中
          for (var i = 0; i < coors.length; i += 2) {
            pl.push({ latitude: coors[i], longitude: coors[i + 1] })
          }
          console.log(pl);
          _this.setData({
            // 将路线的起点设置为地图中心点
            latitude:pl[0].latitude,
            longitude:pl[0].longitude,
            // 绘制路线
            polyline: [{
              points: pl,
              color: '#58c16c',
              width: 6,
              borderColor: '#2f693c',
              borderWidth: 1
            }]
          })
      },fail:function(err){
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const order = JSON.parse(options.order);// 将字符串转换回对象
    this.setData({
      order: order
    });
    this.Path();
  },
})