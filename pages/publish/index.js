const app=getApp()
const {publishNote,upload_file} = app.require('request/index.js');
const {formatTime} = app.require('utils/util.js');

Page({
  data: {
    courseCode:"",
    uniList:["昆士兰大学"],
    id:"1",
    imgPaths: []
  },
  bindPickerChange: function(e) {
    this.setData({
      id: e.detail.value
    })
  },
  uploadImg: function () {
    let a = this;
    wx.showActionSheet({
      itemList: ["从相册中选择", "拍照"],
      itemColor: "#f7982a",
      success: function (e) {
        //album:相册   //camera拍照
        e.cancel || (0 == e.tapIndex ? a.chooseWxImageShop("album") : 1 == e.tapIndex && a.chooseWxImageShop("camera"));
      }
    });
  },
  //a：选择的类型  //album:相册   //camera拍照
  chooseWxImageShop: function (a) {
    var e = this;
    wx.chooseImage({
      sizeType: ["original", "compressed"],
      sourceType: [a], //类型
      count: 6 - this.data.imgPaths.length,
      success: (a) => {
        if (a.tempFiles[0].size > 2097152) {
          wx.showModal({
            title: "提示",
            content: "选择的图片过大，请上传不超过2M的图片",
            showCancel: !1,
            success: function (a) {
              a.confirm;
            }
          })
        } else {
          //把图片上传到服务器
          console.log(a);
          e.setData({
            imgPaths: [...this.data.imgPaths,...a.tempFilePaths] 
          })
        }
      }
    });
  },

changeCourse(e){
  this.setData({courseCode:e.detail.value});
},
  onDelete(e){
    const {name} = e.currentTarget.dataset;
    this.setData({imgPaths:this.data.imgPaths.filter(item=>item!==name)})
  },
  async onSubmit(e){
    const {courseCode} = this.data
    const {uniId,title,content}=e.detail.value
    // const publishTime = formatTime(new Date())
    // // console.log({title,content,uniId:parseInt(uniId)});
    if(!courseCode.match(/^[a-zA-Z]{4}[0-9]{4}$/)){
      wx.showToast({
        icon:"error",
        title: '课程代码不对哦',
      })
      return 
    }
    if (!title) {
      wx.showToast({
        icon:"error",
        title:'标题不能为空',
      })
      return
    }
    if (!content) {
      wx.showToast({
        icon:"error",
        title:'内容不能为空',
      })
      return
    }
    console.log(this.data.imgPaths);
    wx.showLoading()
    const res = await publishNote({title,content,courseCode,uniId:parseInt(uniId)})
    wx.hideLoading()
    
    if (res.data.code===200) {
      const {imgPaths} = this.data
      imgPaths.forEach(item=>{
        upload_file(item,res.data.data)
      })
      // for(let i of imgPaths){
      //   console.log(i);
      //    upload_file(i,res.data.data)
      // }
      wx.navigateBack({
        delta: -1,
      })
      wx.redirectTo({
        url:"/pages/myNote/index?publishing=true"
      })
    }
    else{
      wx.showToast({
        icon:"error",
        title:res.data.errMsg,
      })
    }
  },
  onLoad: function (options) {

  },


})