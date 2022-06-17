const app = getApp()
const {
  addJdCollect
} = app.require('request/index.js');

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
    jobList:[],
    startX:0,
    startY:0
  },
  lifetimes:{
    attached(){
      this.setData({jobList:this.properties.jobList.map(item=>({...item,showDelete:false}))})
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e){
      const {id,status} = e.currentTarget.dataset;
      if(status){
        wx.showToast({
          title: '该职位已被删除！',
        })
        return
      }
      wx.navigateTo({
        url: `/pages/jobDetail/index?id=${id}`,
      })
    },
    touchStart(e){
      this.data.jobList.forEach((v,i)=>{
        if(v.showDelete) v.showDelete=false
      })
      this.setData({
        startX:e.changedTouches[0].clientX,
        startY:e.changedTouches[0].clientY,
        jobList:this.data.jobList
      })
    },
    touchMove(e){
      const that = this,
      index = e.currentTarget.dataset.index,
      startX = this.data.startX,
      startY = this.data.startY,
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      angle = that.angle({X:startX,Y:startY},{X:touchMoveX,Y:touchMoveY})//获取滑动角度
      that.data.jobList.forEach((v,i)=>{
        v.showDelete = false
        //滑动超过30度角 return
        if(Math.abs(angle)>30) return
        if(i==index){
          if(touchMoveX>startX) v.showDelete=false //右滑
          else v.showDelete=true //左滑
        }
        this.setData({jobList:this.data.jobList})
      })
    },
    angle(start,end){
      const _X = end.X - start.X,
            _Y = end.Y - start.Y
            return 360* Math.atan(_Y / _X)/(2 * Math.PI)
    },
    async onDelete(e){
      const {id} = e.currentTarget.dataset;
      const res = await addJdCollect(id,false)
      if(res.data.code===200){
        this.triggerEvent("refresh")
      }
    }
  }
})
