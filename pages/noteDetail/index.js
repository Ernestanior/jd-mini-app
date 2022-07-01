// pages/noteDetail/index.js
const app=getApp()
const {formatTime} = app.require('utils/util.js');
const {getNoteComment,getNoteDetail,likeNote,favNote,deleteNote} = app.require('request/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // noteDetail: {
    //   id: 1,
    //   title: "CSSE1001|WEEK1",
    //   type: "Official",
    //   authorId: 1,
    //   authorName: "喵小远",
    //   authorAvatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/sLFwDic6O9Fs5dLgkdbicicZEGjcas0U3VOeMLD52rD1zHGUqXhWCu0cIIYkbJjMmDPMTQnjWnMIpQiamX39Nyjnyw/132",
    //   uniName: "University of Queensland",
    //   courseCode: "csse1001",
    //   content: `-FINM7409作为Foundation Courses之一, 目的在于使学生们学会分析和解释财务报表,进行财务预测和做出投资决策，并且能够对市场效率和资产定价模型进行分析。
    //   -分数构成和考察内容
    //   这门课的分数由期中考试，小组项目和期末考试三部分组成其中期中考试的比重为30%，小组项目的比重为20%，期末考试的比重为50%
    //   1. Midsemester Exam(30%)
    //   期中考试的检测内容是前4周Lecture上讲的三大财务报表和会计分录的内容。没有会计基础的同学最好提前预习一下分录部分，因为lecturer会快速进入报表的讲解，对分录不熟悉容易跟不上老师的上课进度。
    //   2. Project(20%)
    //   小组project主要考察第五周Analysis and interpretation of financial statements中的内容，利用Lecture中的公式，分析案例中的财务数据，从而分析公司的经营状况，并写出分析报告。`,
    //   publishTime: "20220106172334",
    //   like: 3,
    //   likedByCurUser: true,
    //   fav: 3,
    //   favedByCurUser: true,
    //   visitor: 19
    // },
    noteDetail:{},
    comment:[],
    input:"",
    id:-1, // noteID
    favedByCurUser:false,
    likedByCurUser:false,
    fav:0,
    like:0,
    isMyNote:false
  },

//点击事件  
clickImg: function(e){
  // var imgUrl = this.data.imgUrl;
  const image = e.target.dataset.url
  wx.previewImage({
    urls: [image], //需要预览的图片http链接列表，注意是数组
    current: '', // 当前显示图片的http链接，默认是第一个
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
},
  ConvertContent(str, style) {
    if (!str) {
      return ''
    } else {
      style = style || 'style="margin: 20rpx 0;"'
      str = `<p ${style}>` + str
      return str.replace(/\n|\r/g, `</p><p ${style}>`)
    }
  },
  ConvertTime(time){
    return `${time.slice(0,4)}-${time.slice(4,6)}-${time.slice(6,8)} ${time.slice(8,10)}:${time.slice(10,12)}`
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // const tt = new Date();
    // console.log(formatTime(tt));
    const {id}=options;
    this.setData({id})
    this.getNoteDetail(id)
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  async getNoteComment(){
    const comment = await getNoteComment(this.data.id)
    this.setData({
      comment:comment.data.data,
    })
  },
  editComment(e){
    console.log(e.detail);
    this.setData({comment:e.detail});
  },
  async getNoteDetail(nid){
    wx.showLoading({title: 'loading'})
    const noteDetail = await getNoteDetail(nid)
    const {id} = wx.getStorageSync('user-token')
    wx.hideLoading()
    const {data}=noteDetail.data
    const {likedByCurUser,favedByCurUser,fav,like,authorId}=data
    // const {noteDetail}=this.data
    const content = this.ConvertContent(data.content)
    const publishTime = this.ConvertTime(data.publishTime)
    this.setData({
      noteDetail:{...data,content,publishTime},
      isMyNote: id===authorId,
      fav,
      like,
      likedByCurUser,
      favedByCurUser
    })
    this.getNoteComment(nid)
  },
  async handleLike(){
    const {id,like,likedByCurUser} = this.data
    this.setData({
      like:likedByCurUser?like-1:like+1,
      likedByCurUser:!likedByCurUser
    })
    await likeNote(id,!likedByCurUser)
  },
  async handleFav(){
    const {id,fav,favedByCurUser} = this.data
    this.setData({
      favedByCurUser:!favedByCurUser,
      fav:favedByCurUser?fav-1:fav+1,
    })
    await favNote(id,!favedByCurUser)
  },  
  handleDelete(){
    const {id} = this.data
    wx.showModal({
      title: '删除',
      content: '你确定要删除该笔记么？',
      success: async (res)=> {
        if (res.confirm) {
          const res = await deleteNote(id)
          if(res.data.code===200){
            wx.navigateBack({
              success:()=>{
                wx.showToast({
                  title: 'Delete Success',
                })
              }
            })
          }
        } else if (res.cancel) {
          return
        }
      }
    })
  },
})