// components/jobCollect/index.js
const app=getApp()
const {request,getFavNote} = app.require('request/index.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    noteList: [],
    stopLoading: false,
    pageNum: 1,
    pageSize:10,
    triggered:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSearch(){
      this.setData({
        stopLoading: false,
        pageNum:1,
      },async ()=>{
        const {pageNum,pageSize}=this.data
        const payload = {
          pageNum,
          pageSize
        }
        wx.showLoading({
          title: 'loading',
          mask: true,
        })
        const res = await getFavNote(payload)
        this.setData({noteList:res.data.data || [],triggered:false});
        wx.hideLoading()
      })
    },
    reload(){
      this.handleSearch()
    },
    loadMore() {
      !this.data.stopLoading && 
      this.setData({
        pageNum: this.data.pageNum + 1
      }, async () => {
        const {noteList,pageNum,pageSize}=this.data
        wx.showLoading({
          title: 'loading',
          mask: true,
        })
        const result = await getFavNote({pageNum,pageSize})
        wx.hideLoading()      
        const {data}=result.data
        if (data) {
          this.setData({noteList:[...noteList,...data]})
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
  },
  lifetimes:{
    attached(){
      this.handleSearch()
    }
  }
})
