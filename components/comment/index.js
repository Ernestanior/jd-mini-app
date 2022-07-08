// components/jobBox/index.js
const app=getApp()
const {newComment, likeComment} = app.require('request/index.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment: {
      type: Array,
      value: []
  },
    noteId:{
      type:Number,
      value:-1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue:"",
    inputActive:false,
    replyId:0,
    replyAuthor:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInput(e){
      this.setData({inputValue:e.detail.value})
    },
    async onSubmit(e){
      const {replyId} = this.data
      if(replyId){
        await newComment({
          noteId:this.properties.noteId,
          content:this.data.inputValue,
          replyId,
          replyToOthers:1
        })
      }
      else{
        await newComment({
          noteId:this.properties.noteId,
          content:this.data.inputValue,
          replyToOthers:0
        })
      }
      this.setData({inputValue:"",replyId:0})
      this.triggerEvent("refreshComment")
    },
    async likeComment(e){
      const {id,likedByCurUser,like}=e.currentTarget.dataset.currcomment;
      await likeComment(this.properties.noteId,id,!likedByCurUser)
      const {comment}=this.properties
      comment.forEach((item)=>{
        if(item.id===id){
          item.likedByCurUser = !likedByCurUser
          item.like = likedByCurUser?like-1:like+1
        }
      })
      this.triggerEvent("editComment",comment)
    },
    async handleReply(e){
      console.log(e);
      const {id,authorName} = e.currentTarget.dataset.currcomment
      this.setData({inputActive:true,replyId:id,replyAuthor:`回复 ${authorName}`})
    }
  }
})
