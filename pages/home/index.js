// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{
      imgURL: '/assets/icons/notebook.png',
      title: '职业搜索',
      url: '/pages/job/index',
    }, {
      imgURL: '/assets/icons/recruit.png',
      title: '学霸笔记',
      url: '/pages/note/index',
    }, {
      imgURL: '/assets/icons/stream.png',
      title: '实习校招',
      url: '/',
    }, {
      imgURL: '/assets/icons/write.png',
      title: '课程吐槽',
      url: '/',
    }]
  },
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