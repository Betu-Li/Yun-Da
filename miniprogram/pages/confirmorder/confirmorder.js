// pages/confirmorder/confirmorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mybackfill:'',
    tobackfill:'',
    price:30,
    distance:'',
    carTypes: ['小货车', '中货车', '大货车'], 
    selectedCarTypeIndex: 0,
    first_price:[30,50,80],
    second_price:[3,4,6],
    carImages: [
      '/images/map/small.jpg', 
      '/images/map/nomal.jpg', 
      '/images/map/big.jpg'  
    ]
  },
  finishOrder(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var time=year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    var username=wx.getStorageSync('username');
    var from=wx.getStorageSync('from');
    var to=wx.getStorageSync('to');
    
    
    wx.cloud.callFunction({
      name:'dbFunctions',
      data: {
        type: 'createOrder',
        username: username,
        car:this.data.carTypes[this.data.selectedCarTypeIndex],
        distance:this.data.distance/1000,
        price:this.data.price,
        from:from,
        to:to,
        time:time,
        mybackfill:this.data.mybackfill,
        tobackfill:this.data.tobackfill
      },
      success(res){
        console.log(res.result)
        wx.showModal({
          title: '订单已生成',
          content:'返回主页',
          showCancel:false,
          success:function(){
            wx.switchTab({
              url: '/pages/map_index/map_index',
            })
          }
        })
      }
    })
},
  onCarTypeChange(e) {
    var select=e.detail.value
    this.setData({
      selectedCarTypeIndex:select
    });
    if(this.data.distance>3000)
    {
      var price=this.data.first_price[this.data.selectedCarTypeIndex]+this.data.second_price[this.data.selectedCarTypeIndex]*(this.data.distance-3000)/1000;
    }
    else{
      var price=this.data.first_price[this.data.selectedCarTypeIndex];
    }
    this.setData({
      price: price.toFixed(2)
    })
    console.log(this.data.price);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var distance=wx.getStorageSync('distance')
    var mybackfill = wx.getStorageSync('mybackfill');
    var tobackfill = wx.getStorageSync('tobackfill');
    this.setData({
      distance:distance,
      mybackfill:mybackfill,
      tobackfill:tobackfill
    });
    if(this.data.distance>3000)
    {
      var price=this.data.first_price[this.data.selectedCarTypeIndex]+this.data.second_price[this.data.selectedCarTypeIndex]*(this.data.distance-3000)/1000;
    }
    else{
      var price=this.data.first_price[this.data.selectedCarTypeIndex];
    }
    this.setData({
      price:price.toFixed(2)
    })
  },
})