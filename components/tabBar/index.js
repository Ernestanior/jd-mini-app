// components/tabBar/index.js
Component({
  /**
   * 组件的属性列表
   */
  
  properties: {
    tid:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userinfo:{},
    tabList:[
      {
        id:0,
        isActive:true,
        img:'/assets/icons/tabBar/home.png',
        imgActive:'/assets/icons/tabBar/home_fill.png',
        open_type:null,
        title:'首页',
        bindtap:"goto_home"
      },
      {
        id:1,
        isActive:false,
        img:'/assets/icons/tabBar/func.png',
        imgActive:'/assets/icons/tabBar/func_fill.png',
        open_type:null,
        title:'新增功能',
        bindtap:"goto_func"
      },
      {
        id:2,
        isActive:false,
        img:'/assets/icons/tabBar/service.png',
        imgActive:'/assets/icons/tabBar/service_fill.png',
        open_type:"contact",
        title:'客服',
        bindtap:null
      },
      {
        id:3,
        isActive:false,
        img:'/assets/icons/tabBar/mine.png',
        imgActive:'/assets/icons/tabBar/mine_fill.png',
        open_type:null,
        title:'个人资料',
        bindtap:"goto_mine"
      },
    ]
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      // const userinfo = wx.getStorageSync("userinfo");
      // this.setData({
      //   userinfo
      // })
      let {tabList,tid}=this.data
      tabList.forEach((v,i)=>v.isActive=(v.id==tid))
      this.setData({
        tabList
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goto_home: function () {
      if(this.data.tid!=0){
        wx.redirectTo({
          url: '/pages/home/index'
        })
      }
    },
    goto_mine(){
      if(this.data.tid!=3){
        wx.redirectTo({
          url: '/pages/mine/index'
        })
      }
    },
    goto_func(){
      // console.log(this.data);
      let {tid}=this.data;
      if(tid!=1){
        if (this.data.userinfo) {
          wx.redirectTo({
            url: '/pages/func/index',
          })
        }
        else {
          wx.showModal({
            content: '请先进行登录',
            showCancel: false,
            success:function(){
              if(tid!=3){
                wx.redirectTo({
                  url: '/pages/mine/index',
                })
              }
            }
          })
        }
      }
    }
  }
})
