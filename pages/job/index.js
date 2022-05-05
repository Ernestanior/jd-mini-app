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
    [
      {img:"https://s1.ax1x.com/2022/05/05/OZInTH.png",url:"1"},
      {img:"https://s1.ax1x.com/2022/05/05/OZIg74.png",url:"2"},
      {img:"https://s1.ax1x.com/2022/05/05/OZI491.png",url:"3"},
      {img:"https://s1.ax1x.com/2022/05/05/OZIbHe.png",url:"4"},
      {img:"https://s1.ax1x.com/2022/05/05/OZoSjf.png",url:"5"},
      {img:"https://s1.ax1x.com/2022/05/05/OZoCDS.png",url:"6"},
    ]
  },

  handleSearch(e){
    const {type,value,city}=e.detail;
    wx.navigateTo({
      url:`/pages/jobSearch/index?${type}=${value}&city=${city}`
    });
  }
})