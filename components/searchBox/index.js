const app = getApp()
const {
  request,
  getJdList
} = app.require('request/index.js');
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
    onShow: false,
    inputValue: "",
    cityList:['上海','广州','北京','深圳','成都','杭州','重庆','Brisbane','Melbourne','Sydney'],
    city:'上海',
    cityListShow:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchDD() {
      this.setData({
        onShow: !this.data.onShow
      })
    },
    switchCity() {
      this.setData({
        cityListShow: !this.data.cityListShow
      })
    },
    handleDDSelect(e) {
      const {ddvalue} = e.currentTarget.dataset
      this.setData({
        ddValue: ddvalue
      })
    },
    handleCitySelect(e){
      const {city} = e.currentTarget.dataset
      this.setData({city})
    },
    handleInput(e) {
      this.setData({
        inputValue: e.detail.value
      });
    },
    async handleSearch(e) {
      // let data;
      // switch (this.data.ddValue) {
      //   case "公司":
      //     data = {
      //       "city": "上海",
      //       "company": this.data.inputValue,
      //       "pageNum": 1,
      //       "pageSize": 5
      //     };
      //     break;
      //   default:
      //     data = {
      //       "city": "上海",
      //       "role": this.data.inputValue,
      //       "pageNum": 1,
      //       "pageSize": 10
      //     }
      //     break;
      // };
      // const res = await getJdList(data);
      // console.log(res);
      let type;
      switch (this.data.ddValue) {
        case "公司":
          type='company'
          break;
      
        default:
          type='role'
          break;
      }
      // wx.navigateTo({
      //   url:`/pages/jobSearch/index?${type}=${this.data.inputValue}`,
      // })
      this.triggerEvent('searchParams',{type:type,value:this.data.inputValue,city:this.data.city})
    }
  }
})