// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[
      {
        imgURL:'/assets/icons/notebook.png',
        title:'职业搜索',
        url: '/pages/jobSearch/index',
      },      {
        imgURL:'/assets/icons/recruit.png',
        title:'GPA计算',
        url: '/pages/jobSearch/index',
      },      {
        imgURL:'/assets/icons/stream.png',
        title:'实习校招',
        url: '/pages/jobSearch/index',
      },      {
        imgURL:'/assets/icons/write.png',
        title:'课程吐槽',
        url: '/pages/jobSearch/index',
      }
    ]
  },
  handleNavigate(e){
    const {url}=e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


})