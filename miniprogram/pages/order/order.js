// pages/order/order.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mylongitude:'',
    mylatitude:'',
    tolatitude:'',
    tolongitude:'',
    polyline:'',
    longitude:'118.045605',
    latitude:'24.366615',
  },
  Path(){ //计算路径并绘制
    var _this = this;
    var from = this.data.mylatitude+','+this.data.mylongitude;
    var to = this.data.tolatitude+','+this.data.tolongitude;
    wx.setStorageSync('from', from)
    wx.setStorageSync('to', to)
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
        var distance = route.distance
        var coors = route.polyline, pl = [];
        wx.setStorageSync('distance', distance)
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
  onLoad(options) {
    var mylongitude=wx.getStorageSync('mylongitude');
    var mylatitude=wx.getStorageSync('mylatitude');
    var tolongitude=wx.getStorageSync('tolongitude');
    var tolatitude=wx.getStorageSync('tolatitude');
    this.setData({
      mylongitude:mylongitude,
      mylatitude:mylatitude,
      tolatitude:tolatitude,
      tolongitude:tolongitude
    })
    var _this = this;
      wx.getLocation({ // 获取当前经纬度，显示在地图中心
        isHighAccuracy: true,
        type: 'gcj02',
        success: function(res) {
          console.log(res);
          
          var latitude = res.latitude
          var longitude = res.longitude
          _this.setData({
            latitude: latitude,
            longitude: longitude
          })
        },
        fail(res){
          console.log(res);
        }
      })
      this.Path()
  },

})