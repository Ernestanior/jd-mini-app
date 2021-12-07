// pages/gpa/index.js
const app=getApp()
const {request,getPercent} = app.require('request/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:'',
    assessments:[],
    finalGPA:0
  },
  // handleCalculate(){
  //   console.log(this.data.assessments);
  // },
  formSubmit(e) {
    let scoreList=[]
    const {value}=e.detail
    for(let i in value){
      scoreList=[...scoreList,value[i]]; 
    }
    scoreList=scoreList.slice(1)
    // console.log(scoreList);

    const {assessments}=this.data
    // this.setData({
    //   assessments:assessments.map((item,index)=>({...item,score:scoreList[index]}))
    // })
    // const finalGPA=assessments
    // .map((item,index)=>({...item,score:scoreList[index]}))
    // .reduce((curr,total)=>{
    //   console.log(curr);
    //   // console.log(curr.score);
    //    return total+parseInt(curr.percentage)*parseInt(curr.score)
    // },0)
    // this.setData({finalGPA})
    const finalGPA=assessments    
    .reduce((total,curr,index)=>{
        console.log(curr);
        console.log(scoreList[index]);
         return total+parseInt(curr.percentage)*scoreList[index]/100
      },0)
      this.setData({finalGPA})
    console.log(finalGPA);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      course:options.course.toUpperCase()
    })
    wx.showLoading({
      title: '加载中',
    })
    const res =await getPercent(this.data.course)
    wx.hideLoading()

    if(!res.data.assessments.length){
      wx.showModal({
        title:"出了点意外",
        content:"目前还没录入该科目哦",
        showCancel:false,
        confirmText:"返回",
        success(res){
          if(res.confirm){
            wx.navigateBack()
          }
        }
      })
    };
    this.setData({
      assessments:res.data.assessments
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function  () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})