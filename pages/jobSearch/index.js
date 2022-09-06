const app = getApp()
const {
  request,
  getJdList,
  getRecJd,
  getAllRecJd
} = app.require('request/index.js');
const {
  debounce
} = app.require('utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ddList: ['职位', '公司'],
    ddValue: '职位',
    placeholder: "职位 / 公司 ",
    type: "",
    value: "",
    pageNum: 1,
    city: '全部',
    stopLoading: false,
    jobList: [],
    triggered:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    // const type = Object.keys(options)[0]
    // const city = options['city']
    // const value = options[type]
    this.setData({
      stopLoading: false,
      pageNum:1,
    }, () => {
      const {
        pageNum,
        city,
        type,
        value
      } = this.data
      this.findJdList(city, pageNum, type, value, true)
    })
  },
  handleSearch(e) {
    const {
      type,
      value,
      city
    } = e.detail;
    this.setData({
      stopLoading: false,
      pageNum:1,
      type,
      value,
      city
    }, () => {
      const {
        pageNum,
        city,
        type,
        value
      } = this.data
      this.findJdList(city, pageNum, type, value, true)
    })
  },
  async findJdList(city, pageNum, type, value, reload) {
    wx.showLoading({
      title: 'loading',
      mask: true,
    })
    let res;
    if(value){
      res = await getJdList({
        city,
        pageNum,
        "pageSize": 10,
        [type]: value
      })
    }
    else{
      if(city==="全部"){
        res = await getAllRecJd(pageNum)
      }
      else{
        res = await getRecJd(city)
      }
    }
    wx.hideLoading()
    if (res) {
      const {
        data
      } = res.data
      if (data) {
        if (this.data.city==="全部") {
          this.setData({
            jobList: reload ? [...data] : [...this.data.jobList, ...data],
            stopLoading: false,
            triggered:false
          })
        }
        else if (data.length < 10 || !value) {
          // wx.showToast({
          //   title: '没有更多职位了哦',
          // })
          this.setData({
            jobList: reload ? [...data] : [...this.data.jobList, ...data],
            stopLoading: true,
            triggered:false
          })
        }
        else{
          this.setData({
            jobList: reload ? [...data] : [...this.data.jobList, ...data],
            stopLoading: false,
            triggered:false
          })
        }
        return data;
      }
    } else {
      console.log(res);
    }
  },
  reload(){
    this.setData({
      stopLoading: false,
      pageNum:1,
    }, () => {
      const {
        pageNum,
        city,
        type,
        value
      } = this.data
      this.findJdList(city, pageNum, type, value, true)
    })
  },
  loadMore() {
    !this.data.stopLoading && this.setData({
      pageNum: this.data.pageNum + 1
    }, async () => {
      const {
        pageNum,
        city,
        type,
        value
      } = this.data
      this.findJdList(city, pageNum, type, value, false)
      // if (result.length < 10) {
      //   wx.showToast({
      //     title: '没有更多职位了哦',
      //   })
      //   this.setData({
      //     stopLoading: true
      //   })
      // }
    })
  }
})