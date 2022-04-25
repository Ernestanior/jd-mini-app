// pages/func/index.js

const getMd = require('../../request/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    md:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const res = await getMd()
    const html = res.data
    // console.log(html);
    this.setData({md:html})
    // WxParse.wxParse('article', 'html', html, this,0)
  },
})