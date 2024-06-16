// pages/map_index/map_index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mybackfill:"",
    tobackfill:""
  },
  toUser: function() {
    wx.navigateTo({
      url: '/pages/user/user' 
    });
  },
  toMyaddress:function(){
    wx.navigateTo({
      url: '/pages/myAddress/myAddress' 
    });
  },
  toToaddress:function(){
    wx.navigateTo({
      url: '/pages/toAddress/toAddress' 
    });
  },
  toOrder:function(){
    wx.navigateTo({
      url: '/pages/order/order' 
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var mybackfill = wx.getStorageSync('mybackfill');
      var tobackfill = wx.getStorageSync('tobackfill');
      this.setData({
        mybackfill: mybackfill,
        tobackfill: tobackfill
      });
  },
})
