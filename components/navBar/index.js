// pages/navBar/navBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      background: {
          type: String,
          value: 'rgba(255, 255, 255, 1)'
      },
      color: {
          type: String,
          value: 'rgba(0, 0, 0, 1)'
      },
      titleText: {
          type: String,
          value: ''
      },
      titleImg: {
          type: String,
          value: ''
      },
      titleColor:{
        type: String,
        value: ''
      },
      backIcon: {
          type: String,
          value: ''
      },
      homeIcon: {
        type: String,
        value: ''
        },
      fontSize: {
          type: Number,
          value: 32
      },
      iconHeight: {
          type: Number,
          value: 38
      },
      iconWidth: {
          type:Number,
          value: 116
      },
      backgroundColor:{
        type:String,
        value:'#fff'
      }
  },
  attached: function(){
      var that = this;
      that.setNavSize();
      that.setStyle();
  },
  data: {

  },
  methods: {
      // 通过获取系统信息计算导航栏高度
      setNavSize: function() {
          var that = this
              , sysinfo = wx.getSystemInfoSync()
              , statusHeight = sysinfo.statusBarHeight
              , isiOS = sysinfo.system.indexOf('iOS') > -1
              , navHeight;
          if (!isiOS) {
              navHeight = 96;
          } else {
              navHeight = 120;
          }
          that.setData({
              status: statusHeight,
              navHeight: navHeight
          })
      },
      setStyle: function() {
          var that  = this
              , containerStyle
              , textStyle
              , iconStyle;
          containerStyle = [
              'background:' + that.data.background
              ].join(';');
          textStyle = [
              'color:' + that.data.color,
              'font-size:' + that.data.fontSize*2 + 'rpx'
          ].join(';');
          iconStyle = [
              'width: ' + that.data.iconWidth*2 + 'rpx',
              'height: ' + that.data.iconHeight*2 + 'rpx'
          ].join(';');
          that.setData({
              containerStyle: containerStyle,
              textStyle: textStyle,
              iconStyle: iconStyle
          })
      },
      // 返回事件
      back: function(){
          wx.navigateBack({
              delta: 1
          })
          this.triggerEvent('back', {back: 1})
      },
      home: function() {
          console.log('home');
          this.triggerEvent('home', {});
      }
  }
})