// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{
      imgURL: '/assets/icons/notebook.png',
      title: '职业搜索',
      url: '/pages/jobSearch/index',
    }, {
      imgURL: '/assets/icons/recruit.png',
      title: '学霸笔记',
      url: '/pages/note/index',
    }, {
      imgURL: '/assets/icons/stream.png',
      title: '留学缴费',
      url: '/pages/alipay/index',
    }, {
      imgURL: '/assets/icons/write.png',
      title: '待开发',
      url: '/',
    }]
  },
  onLoad(){
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  // onShareAppMessage(){
  //   return {
  //     title:"转发到朋友"    }
  // },
  // onShareTimeline(){
  //   return {
  //     title:"转发到朋友圈"    }
  // },
  handleNavigate(e) {
    const {url} = e.currentTarget.dataset
    const userInfo = wx.getStorageSync('userinfo')
    if (userInfo && userInfo.nickName) {
      wx.navigateTo({
        url,
      })
    } else {
      wx.showModal({
        content: '请先进行登录',
        showCancel: false,
        success: function () {
          wx.redirectTo({
            url: '/pages/mine/index',
          })
        }
      })
    }
  },


})