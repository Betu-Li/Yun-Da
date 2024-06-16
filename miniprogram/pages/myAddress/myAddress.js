// pages/myAddress/myAddress.js
//导入腾讯地图
const QQMapWX = require('../../lib/qqmap-wx-jssdk');
var qqmapsdk = new QQMapWX({
    key:"填入你的腾讯地图key"
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    backfill:'',
    longitude:'118.045605',
    latitude:'24.366615',
    
  },
  addMarker: function () {
    // 动态添加marker
    this.mapCtx.addMarkers({
      markers: [{
        id: 0,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        iconPath:'/images/map/task.png',
        width:20,
        height:20
      }]
    })
    wx.setStorageSync('mymarker', this.data.markers)
  },
  setMylocation(e){
    wx.setStorageSync('mylongitude', this.data.longitude)
    wx.setStorageSync('mylatitude', this.data.latitude)
    
    wx.switchTab({
      url: '/pages/map_index/map_index',
    })
    wx.setStorageSync('mybackfill', this.data.backfill)
  },
  getsuggest: function(e) {//触发关键词输入提示事件
    var _this = this;
    var keyword=e.detail.value;
    if (!keyword) {
      console.log('keyword参数格式有误');
      return; // 如果keyword无效，跳过这次调用
    }
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: keyword, //用户输入的关键词
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function(res) {//搜索成功后的回调
        console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug,
        });
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  },
  backfill: function (e) {//数据回填方法
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length;i++){
      if(i == id){
        this.setData({
          backfill: this.data.suggestion[i].title,//数据回填
          //将地图的经纬度选中地点的经纬度
          latitude: this.data.suggestion[i].latitude,
          longitude: this.data.suggestion[i].longitude
        });
      }  
    }
    this.addMarker
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.mapCtx = wx.createMapContext('map')
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
          console.log(_this.data.latitude+' '+_this.data.longitude);
        },
        fail(res){
          console.log(res);
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})