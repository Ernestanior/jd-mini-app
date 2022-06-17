const app=getApp()
const {likeNote,favNote} = app.require('request/index.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    noteList: {
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
      const {id,status} = e.currentTarget.dataset;
      if(!status){
        wx.showToast({
          title: '该笔记已被删除！',
        })
        return
      }
      wx.navigateTo({
        url: `/pages/noteDetail/index?id=${id}`,
      })
    },
    async handleLike(e){
      let {noteList} = this.properties
      const {id,like} = e.currentTarget.dataset;
      noteList.forEach(item=>{
        if(item.id===id){
          item.like=like?item.like-1:item.like+1
          item.likedByCurUser=!like
        }
      })
      this.setData({noteList})
      await likeNote(id,!like)
    },
    async handleFav(e){
      let {noteList} = this.properties
      const {id,fav} = e.currentTarget.dataset;
      noteList.forEach(item=>{
        if(item.id===id){
          item.fav=fav?item.fav-1:item.fav+1
          item.favedByCurUser=!fav
        }
      })
      this.setData({noteList})
      await favNote(id,!fav)
    },  
  }
})
