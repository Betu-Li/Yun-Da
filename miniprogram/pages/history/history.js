// pages/history/history.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      orderList: [
        {
          _id:'',
          car:'',
          distance:'',
          from:'',
          to:'',
          price:'',
          time:'',
          mybackfill:'',
          tobackfill:'',
        }
      ]
  },
  toMap:function(){
    wx.switchTab({
      url: '/pages/map_index/map_index',
    })
  },
  selectOrder(){//查询订单信息
    var _this = this;
    var username = wx.getStorageSync('username');
    wx.cloud.callFunction({
      name:'dbFunctions',
      data:{
        type:'selectOrder',
        username:username
      },success:function(res){
        if(res.result.data.length>0){
          console.log(res.result.data);
        } else{
          console.log("查询失败,没有订单信息")
        }
        var orderList = res.result.data
          _this.setData({
            orderList:orderList.reverse() // 倒序展示
         })
      }
    })
  },
  // 跳转到订单详情页
  goToOrderDetail: function (e) {
    const index = e.currentTarget.dataset.index;
    const order = this.data.orderList[index];
    wx.navigateTo({
      url: `/pages/detail/detail?order=${JSON.stringify(order)}`
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.selectOrder();
  },
})