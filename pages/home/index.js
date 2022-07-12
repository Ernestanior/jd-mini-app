// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{
      imgURL: '/assets/icons/homeIcon/manage.png',
      title: '实习校招',
      url: '/pages/jobSearch/index',
    }, {
      imgURL: '/assets/icons/homeIcon/network.png',
      title: '学霸笔记',
      url: '/pages/note/index',
    }, {
      imgURL: '/assets/icons/homeIcon/pay.png',
      title: '待开发',
      // url: '/pages/alipay/index',
      url: '/',
    }, {
      imgURL: '/assets/icons/homeIcon/pedding.png',
      title: '待开发',
      url: '/',
    }]
  },
  onLoad(){
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    // const updateManager = wx.getUpdateManager()

    // updateManager.onCheckForUpdate(function (res) {
    //   // 请求完新版本信息的回调
    //   console.log(res.hasUpdate)
    // })

    // updateManager.onUpdateReady(function () {
    //   wx.showModal({
    //     title: '更新提示',
    //     content: '新版本已经准备好，是否重启应用？',
    //     success(res) {
    //       if (res.confirm) {
    //         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //         updateManager.applyUpdate()
    //       }
    //     }
    //   })
    // })

    // updateManager.onUpdateFailed(function () {
    //   // 新版本下载失败
    //   wx.showModal({
    //     title: '更新提示',
    //     content: '新版本下载失败，请手动删除该小程序后重新添加小程序',
    //     success(res) {
    //       if (res.confirm) {
    //         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //         updateManager.applyUpdate()
    //       }
    //     }
    //   })
    // })

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
      // if(url==="/pages/note/index"){
      //   wx.showModal({
      //     content: '距离此功能开放还剩下3天哦！',
      //     showCancel: false,
      //   })
      //   return
      // }
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