// components/jobCollect/index.js
const app = getApp()
const {
  getJdCollect
} = app.require('request/index.js');
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
    pageNum: 1,
    stopLoading: false,
    jobList: [],
    triggered: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSearch(e) {
      this.setData({
        stopLoading: false,
        pageNum: 1,
      }, () => {
        this.findJdList(this.data.pageNum, true)
      })
    },
    async findJdList(pageNum, reload) {
      wx.showLoading({
        title: 'loading',
        mask: true,
      })
      const res = await getJdCollect({
        pageNum,
        "pageSize": 10,
      })
      wx.hideLoading()
      if (res) {
        console.log(res);
        const {data} = res.data
        if (data) {
          this.setData({
            jobList: reload ? [...data] : [...this.data.jobList, ...data],
            stopLoading: false,
            triggered: false
          })
          return data;
        }
      } else {
        console.log(res);
      }
    },
    reload(){
      this.handleSearch()
    },
    loadMore() {
      !this.data.stopLoading && this.setData({
        pageNum: this.data.pageNum + 1
      }, async () => {
        const result = await this.findJdList(this.data.pageNum,false)
        if (result.length < 10) {
          wx.showToast({
            title: '没有更多职位了哦',
          })
          this.setData({
            stopLoading: true
          })
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