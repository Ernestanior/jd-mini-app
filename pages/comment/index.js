// pages/comment/index.js
const app=getApp()
const {request,getComment} = app.require('request/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const res =await getComment('csse1001')
    console.log(res.data);
    this.setData({commentList:res.data})
  },

 
})