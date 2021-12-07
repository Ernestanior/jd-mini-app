// components/searchBox/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dropDown: {
      type: Boolean,
      value: false
    },
    ddList: {
      type: Array,
      value: []
    },
    ddValue: {
      type: String,
      value: ''
    },
    placeHolder: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    onShow:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchDD(){
      this.setData({
        onShow:!this.data.onShow
      })
    },
    handleDDSelect(e){
      const {ddvalue}=e.currentTarget.dataset
      this.setData({
        ddValue:ddvalue
      })
    },
  }
})
