// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      username:'',
      password:'',
      birth:'',
      sex:'',
      address:'',
      phone:''
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
  createUser(){//创建用户
    var _this = this;
    wx.cloud.callFunction({//调用云函数
      name:'dbFunctions',
      data: {
        type: 'createUser',
        username:_this.data.username,
        password:_this.data.password,
        sex:_this.data.sex,
        birth:_this.data.birth,
        address:_this.data.address,
        phone:_this.data.phone
      },
      success: function(res){
        console.log(res.result)//返回结果，创建成功 code = 0，创建失败 -1
        var code = res.result.code
        if(code == 0){
          wx.showModal({
            title: '注册成功',
            content:'是否返回登录界面',
            confirmText:'是',
            cancelText:'否',
            success(res){
              if(res.confirm){
                console.log("用户点击确定");
                wx.navigateTo({
                  url: '/pages/login/login'
                })
              }else if(res.cancel){
                console.log("用户点击取消");
              }
            }
          })
         
        }else if(code == -1){
          wx.showToast({
            title: '重复用户名',
            icon: 'error',
            duration: 2000,
            mask: false
          })
        }
      },
    })
  },
})