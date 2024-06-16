Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexArray:['男', '女'],
    username:'',
    password:'',
    birth:'',
    sex:'',
    address:'',
    phone:''
  },
  
  setBirth(e) {
    var birth=e.detail.value
    this.setData({
      birth: birth
    })
  },
  setSex(e){
    var index=e.detail.value
    this.setData({
      sex: this.data.sexArray[index]
    })
  },
  setAddress(e){
    var address=e.detail.value
    this.setData({
      address: address
    })
  },
  setPhone(e){
    var phone=e.detail.value
    this.setData({
      phone: phone
    });
  },
  checkPhone(e){
    const phone = this.data.phone;
    const reg = /^1[3-9]\d{9}$/;
    if (!reg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'error'
      });
    } else {
      wx.showToast({
        title: '手机号格式正确',
        icon: 'success'
      });
    }
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
  saveInfo(e){
    console.log(this.data)
    wx.cloud.callFunction({
      name:'dbFunctions',
      data:{
        type:'modifyUser',
        username:this.data.username,
        password:this.data.password,

        sex:this.data.sex,
        birth:this.data.birth,
        address:this.data.address,
        phone:this.data.phone
      },success: function(res){
        console.log(res.result)
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var username=wx.getStorageSync('username');
    var password=wx.getStorageSync('password');
    wx.cloud.callFunction({
      name: 'dbFunctions',
      data: {
        type: 'selectUser',
        username: username,
        password: password
      },
      success: (res) => {
        console.log(res.result)
        var userInfo = res.result.data
        var birth= userInfo[0].birth
        var sex= userInfo[0].sex
        var address= userInfo[0].address
        var phone= userInfo[0].phone
        this.setData({
          username:username,
          password:password,
          birth:birth,
          sex:sex,
          address:address,
          phone:phone
        })
      }
    })
  },

})
