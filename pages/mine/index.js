const app = getApp()
const {getToken,updateUserInfo} = app.require('request/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUseGetUserProfile:true,
    optionList:[
      {
        id:0,
        icon:'/assets/icons/mine/collect.png',
        title:'上传笔记',
        note:'立即上传笔记',
      },      
      {
        id:1,
        icon:'/assets/icons/mine/collect.png',
        title:'查看收藏笔记',
        note:'立即查看笔记',
        isShow:false
      },      
      {
        id:2,
        icon:'/assets/icons/mine/collect.png',
        title:'职位收藏',
        note:'立即查看收藏公司职位',
        isShow:false,
      }
    ]
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        const {encryptedData,rawData,iv,signature,userInfo} =res
        // console.log(userInfo);
        
        wx.login({
          timeout: 10000,
          async success(res){
            const {code}=res;
            wx.showLoading({
              title: 'loading',
            })
            const result = await getToken(code)
            wx.hideLoading()
            if (result.data.code===200) {
              wx.showLoading({
                title: 'loading',
              })
              wx.setStorageSync("user-token", result.data.data);
              wx.setStorageSync("userinfo", userInfo);
              wx.hideLoading()
              wx.redirectTo({
                url: 'index',
              })
            }
            else{
              console.log(result.data.errMsg);
            }
          }
        })
      }
    })
  },
  getUserInfo(e) {
    const {encryptedData,rawData,iv,signature,userInfo} = e.detail;
    wx.login({
      timeout: 10000,
      success:(result)=>{
        const {code}=result;
        console.log(code);
      }
    })
    wx.setStorageSync("userinfo", userInfo);
    wx.redirectTo({
      url: 'index',
    })
  },
  handleShow(e){
    const {id} = e.currentTarget.dataset
    const userInfo = wx.getStorageSync('userinfo')
    if(id===0){
      if (userInfo && userInfo.nickName) {
        wx.navigateTo({
          url: '/pages/publish/index',
        })
      }
      else{
        wx.showModal({
          content: '请先进行登录',
          showCancel: false
        })
      }
    }
    const optionList = this.data.optionList
    optionList[id].isShow=true
    this.setData({
      optionList
    })
  },
  handleClose(){
    const optionList = this.data.optionList
    optionList[1].isShow=false
    optionList[2].isShow=false
    this.setData({
      optionList
    })
  },
  async onShow() {
    const userInfo = wx.getStorageSync("userinfo");
    this.setData({userInfo});
    const {infoUpdateFlag,token,id} = wx.getStorageSync("user-token");
    // console.log(wx.getStorageSync("user-token"));
    if(infoUpdateFlag){
        const {nickName,avatarUrl}=userInfo
        const r = await updateUserInfo({nickName,photoURL:avatarUrl})
        if(r.data.code===200){
          wx.setStorageSync("user-token", {token,infoUpdateFlag:false,id});
        }
    }
  },
})