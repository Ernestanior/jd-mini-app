const app=getApp()
const {request,getNoteByCourse} = app.require('request/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteList:[],
    uniId:1,
    courseCode:'csse1001',
    stopLoading: false,
    pageNum: 1,
    pageSize:10,
    triggered:false,
    // isShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.handleSearch()
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShow: async function () {
    this.handleSearch()
  },
  handleInput(e){
    this.setData({courseCode: e.detail.value.toLowerCase()}) 
  },
  handlePublish(){
    wx.navigateTo({
      url:'/pages/publish/index'
    })
  },

  handleSearch(){
    this.setData({
      stopLoading: false,
      pageNum:1,
    },async ()=>{
      const {uniId,courseCode,pageNum,pageSize}=this.data
      const payload = {
        uniId,
        courseCode:courseCode ||"csse1001",
        pageNum,
        pageSize
      }
      wx.showLoading({
        title: 'loading',
        mask: true,
      })
      const res = await getNoteByCourse(payload)
      this.setData({noteList:res.data.data || [],triggered:false});
      // this.setData({triggered:false})
      wx.hideLoading()
    })
    
  },
  reload(){
    // this.setData({triggered:true})
    // setTimeout(() => {
    //   this.setData({
    //     triggered: false,
    //   })
    //   this._freshing = false
    // }, 3000)
    this.handleSearch()
  },
  loadMore() {
    !this.data.stopLoading && 
    this.setData({
      pageNum: this.data.pageNum + 1
    }, async () => {
      const {uniId,courseCode,pageNum,pageSize}=this.data
      wx.showLoading({
        title: 'loading',
        mask: true,
      })
      const result = await getNoteByCourse({uniId,courseCode,pageNum,pageSize})
      wx.hideLoading()      
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