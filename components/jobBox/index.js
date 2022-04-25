// components/jobBox/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    jobList: {
      type: Array,
      value: []
  },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e){
      const {id} = e.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/jobDetail/index?id=${id}`,
      })
    }
  }
})
