const app=getApp()
const {request,getJdDetail,addJdCollect} = app.require('request/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:1,
    favedByCurUser:false,
    jobDetail:{}

  },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function  (options) {
    const {id} = options
    this.setData({id:id?id:1},async ()=>{
      wx.showLoading({
        title: 'Loading',
      })
      const res = await getJdDetail(this.data.id)
      wx.hideLoading()
      const {data} = res.data
      if(res){
        this.setData({
          jobDetail:data,
          favedByCurUser:data.favedByCurUser
        })
      }
    })
  },
  async handleCollect(){
    const {id,favedByCurUser}=this.data
    this.setData({favedByCurUser:!favedByCurUser})
    await addJdCollect(id,!favedByCurUser)
  }
})