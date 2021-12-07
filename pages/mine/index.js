
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList:[
      {
        id:0,
        icon:'/assets/icons/mine/collect.png',
        title:'上传简历',
        note:'立即上传简历'
      },      
      {
        id:1,
        icon:'/assets/icons/mine/collect.png',
        title:'查看简历',
        note:'立即查看简历'
      },      
      {
        id:2,
        icon:'/assets/icons/mine/collect.png',
        title:'收藏',
        note:'立即查看收藏公司职位',
        isShow:false,
      }
    ]
  },
  handleShow(e){
    const {id} = e.currentTarget.dataset
    const optionList = this.data.optionList
    optionList[id].isShow=true
    this.setData({
      optionList
    })
  },
  handleClose(){
    const optionList = this.data.optionList
    optionList[2].isShow=false
    this.setData({
      optionList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  }
})