// pages/search/index.js
// const app=getApp()
// const {request,getPercent} = app.require('request/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:'',
    searchList:wx.getStorageSync('searchList')
  },
  handleInput(e){
    this.setData({course: e.detail.value.toLowerCase()}) 
  },
  handleCourseTap(e){
    wx.navigateTo({
      url: '../gpa/index?course='+e.target.dataset.course,
    })
  },
  async handleSearch(e){
    if(this.data.course){
      if(this.data.course.match(/^[a-zA-Z]{4}[0-9]{4}$/)){
        // const res = await request(`http://47.117.3.76/kpw/course/info/${this.data.course}`); 
        // console.log(res);
        let newList;
        if( this.data.searchList.length>4){
          newList = this.data.searchList.slice(0,-1);
        }
        else{
          newList = this.data.searchList;
        }
        const searchList = [...new Set([this.data.course.toUpperCase(),...newList])]
        wx.setStorageSync('searchList', searchList)
        this.setData({
          searchList
        })
        wx.navigateTo({
          url: '../gpa/index?course='+this.data.course,
        })
      }
      else{
        console.log('format error');
      }
    }
    else{
      console.log('enter something');
    }
  }
})