const app=getApp()
const {likeNote,favNote} = app.require('request/index.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    note: {
      type: Object,
      value: {}
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
    toDetail(){
      const {id,status} = this.properties.note;
      console.log(id,status);
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
      let {note} = this.data
      const {likecount,like} = e.currentTarget.dataset;
      note.like=like?likecount-1:likecount+1
      note.likedByCurUser=!like
      this.setData({note})
      await likeNote(note.id,!like)
    },
    async handleFav(e){
      let {note} = this.data
      const {favcount,fav} = e.currentTarget.dataset;
      note.fav=fav?favcount-1:favcount+1
      note.favedByCurUser=!fav
      await favNote(note.id,!fav)
      this.setData({note})
    },  
  }
})
