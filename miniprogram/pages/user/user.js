// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuitems: [
      { text: '个人资料', url: '/pages/info/info', icon: '/images/user/mine.png', tips: '', arrows: '/images/user/enter.png' },
      { text: '邀请好友', url: '#', icon: '/images/user/group.png', tips: '', arrows: '/images/user/enter.png' },
      { text: '积分兑换', url: '#', icon: '/images/user/integral.png', tips: '', arrows: '/images/user/enter.png' },
      { text: '帮助说明', url: '#', icon: '/images/user/prompt.png', tips: '', arrows: '/images/user/enter.png' }
    ]
  },
})