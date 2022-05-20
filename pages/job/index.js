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
      {img:"https://www.cdnjson.com/images/2022/05/18/1.png",url:"1"},
      {img:"https://www.cdnjson.com/images/2022/05/18/2.png",url:"2"},
      {img:"https://www.cdnjson.com/images/2022/05/18/3.png",url:"3"},
      {img:"https://www.cdnjson.com/images/2022/05/18/4.png",url:"4"},
      {img:"https://www.cdnjson.com/images/2022/05/18/5.png",url:"5"},
      {img:"https://www.cdnjson.com/images/2022/05/18/6.png",url:"6"},
    ]
  },
  onLoad(){
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  handleSearch(e){
    const {type,value,city}=e.detail;
    wx.navigateTo({
      url:`/pages/jobSearch/index?${type}=${value}&city=${city}`
    });
  }
})