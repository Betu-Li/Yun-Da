// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:''
  },
  toRegister:function(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  setUsername(e){
    var username = e.detail.value
    this.setData({
      username:username
    })
  },
  setPassword(e){
    var password = e.detail.value
    this.setData({
      password:password
    })
  },
  selectUser(){//根据账户密码查询账户
    var _this = this;
    wx.cloud.callFunction({
      name:'dbFunctions',
      data: {
        type: 'selectUser',//调用查询账户数据库的云函数
        username:_this.data.username,
        password:_this.data.password
      },
      success: function(res){
        var result = res.result
        if(result.data.length>0){
          wx.showModal({
            title: '登录成功',
            content:'即将进入运达APP',
            showCancel:false,
            success(res){
              if(res.confirm){
                wx.clearStorageSync()
                wx.setStorageSync('username', _this.data.username)
                wx.setStorageSync('password', _this.data.password)
                wx.switchTab({
                  url: '/pages/map_index/map_index'
                })
              }
            }
          })
        }else{
          wx.showToast({
            title: '密码错误',
            icon: 'error',
            duration: 2000,
            mask: false
          })
        }
      },
      
    })
  },
})