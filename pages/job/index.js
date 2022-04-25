// pages/job/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ddList:['职位','公司'],
    ddValue:'职位',
    placeholder:"职位 / 公司 ",
    images:
    ["https://s4.ax1x.com/2022/01/26/7Os5PU.png",
    "https://s4.ax1x.com/2022/01/27/7O6AX9.png",
    "https://s4.ax1x.com/2022/01/27/7O6Z01.png",
    "https://s4.ax1x.com/2022/01/27/7O6l1e.png",
    "https://s4.ax1x.com/2022/01/27/7O6GnA.png",
    "https://s4.ax1x.com/2022/01/27/7O6BcQ.png"]
  },

  handleSearch(e){
    const {type,value,city}=e.detail;
    wx.navigateTo({
      url:`/pages/jobSearch/index?${type}=${value}&city=${city}`
    });
  }
})