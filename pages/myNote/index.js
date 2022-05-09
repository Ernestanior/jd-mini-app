const app=getApp()
const {request,getNoteById} = app.require('request/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteList:[],
    // uniId:1,
    // courseCode:'csse1001',
    stopLoading: false,
    pageNum: 1,
    pageSize:10,
    triggered:false,
    // isShow:false,
    publishing:false,
    publishPercent:10,
  },
  onLoad:function(options){
    // console.log(options);
    if (options) {
      const {publishing} = options
      publishing&&this.setData({publishing});
      for (let i = 10; i <=100; i+=15)  {
        setTimeout(()=>this.setData({publishPercent:i}),i*140)
      } 
    }
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    // console.log(this.data.publishPercent);
  },
  onShow: async function () {
    this.handleSearch()
  },
  handlePublish(){
    wx.navigateTo({
      url:'/pages/publish/index'
    })
  },
  reload(){
    this.handleSearch()
  },
  handleSearch(){
    const {id}= wx.getStorageSync('user-token')
    this.setData({
      stopLoading: false,
      pageNum:1,
    },async ()=>{
      const {pageNum,pageSize}=this.data
      const payload = {
        AuthorId:id,
        pageNum,
        pageSize
      }
      wx.showLoading({
        title: 'loading',
        mask: true,
      })
      const res = await getNoteById(payload)
      this.setData({noteList:res.data.data || [],triggered:false});
      wx.hideLoading()
    })
    
  },
  loadMore() {
    const {id}= wx.getStorageSync('user-token')
    !this.data.stopLoading && 
    this.setData({
      pageNum: this.data.pageNum + 1
    }, async () => {
      const {pageNum,pageSize}=this.data
      wx.showLoading({
        title: 'loading',
        mask: true,
      })
      const result = await getNoteById({AuthorId:id,pageNum,pageSize})
      wx.hideLoading()      
      console.log(result);
      const {data}=result.data
      if (data) {
        this.setData({noteList:[...this.data.noteList,...data]})
        if (data.length < 10) {
          wx.showToast({
            title: '没有更多笔记了哦',
          })
          this.setData({
            stopLoading: true
          })
        }
      }
    })
  }
})