// components/jobBox/index.js
const app=getApp()
const {getNoteComment,getSubComment, newComment, likeComment } = app.require('request/index.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    noteId:{
      type:Number,
      value:-1
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    comment:[],
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
    async handleSubComment(e){
      const {rid}=e.currentTarget.dataset;
      const res = await getSubComment(this.properties.noteId,rid,1)
      if (res.data.code===200) {
        this.convertComment(this.data.comment,res.data.data,rid)  
      }
    },
    convertComment(origin,children,parentId){
      origin.forEach(item=>{
        if(item.id===parentId){
          if(!item.children){
            item.children=children
            item.expand = true
          }
          else{
            item.children=[...item.children,...children]
          }
        }
      })
      this.setData({comment:origin},()=>{
        console.log(this.data.comment);
      })
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
      this.getNoteComment()
      // this.triggerEvent("refreshComment")
    },
    async likeComment(e){
      const {id,likedByCurUser,like}=e.currentTarget.dataset.currcomment;
      const {comment}=this.data
      comment.forEach((item)=>{
        if(item.id===id){
          item.likedByCurUser = !likedByCurUser
          item.like = likedByCurUser?like-1:like+1
        }
        if(item.children){
          item.children.forEach((i)=>{
            if(i.id===id){
              i.likedByCurUser = !likedByCurUser
              i.like = likedByCurUser?like-1:like+1
            }
          })
        }
      })
      this.setData({comment})
      await likeComment(this.properties.noteId,id,!likedByCurUser)
    },
    async handleReply(e){
      console.log(e);
      const {id,authorName} = e.currentTarget.dataset.currcomment
      this.setData({inputActive:true,replyId:id,replyAuthor:`回复 ${authorName}`})
    },
    async getNoteComment(){
      const comment = await getNoteComment(this.properties.noteId)
      this.setData({
        comment:comment.data.data,
      })
    },
    // editComment(e){
    //   this.setData({comment:e.detail});
    // },
  },
  lifetimes:{
    attached(){
      this.getNoteComment()
    }
  }
})
