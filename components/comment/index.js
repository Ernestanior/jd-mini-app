// components/jobBox/index.js
const app=getApp()
const {getNoteComment,getSubComment, newComment, likeComment } = app.require('request/index.js');
const {debounce} = app.require('utils/util.js');
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
    parentId:0,
    replyAuthor:"",
    commentPage:1,
    stopLoading:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInput(e){
      this.setData({inputValue:e.detail.value})
    },
    async handleSubComment(e){
      const {rid,subpagesize}=e.currentTarget.dataset;
      const res = await getSubComment(this.properties.noteId,rid,subpagesize)
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
            item.subPageSize = 2
          }
          else{
            item.children=[...item.children,...children]
            item.subPageSize=item.subPageSize+1
          }
        }
      })
      this.setData({comment:origin},()=>{
        console.log(this.data.comment);
      })
    },
    async onSubmit(e){
      const {replyId,parentId} = this.data
      if(!replyId){
        await newComment({
          noteId:this.properties.noteId,
          content:this.data.inputValue,
          parentId,
          replyId,
          replyToOthers:1
        })
      }
      else{
        if(parentId){
          await newComment({
            noteId:this.properties.noteId,
            content:this.data.inputValue,
            parentId,
            replyId,
            replyToOthers:0
          })
        }
        else{
          await newComment({
            noteId:this.properties.noteId,
            content:this.data.inputValue,
            parentId:replyId,
            replyId,
            replyToOthers:0
          })
        }

      }
      
      this.setData({inputValue:"",replyId:0,parentId:0,stopLoading:false,triggered: false,commentPage:1})
      this.loadMore()
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
      const {id,authorName,parentId} = e.currentTarget.dataset.currcomment
      this.setData({inputActive:true,replyId:id,parentId,replyAuthor:`回复 ${authorName}`})
    },
    async getComment(noteId,commentPage,comment){
      const res = await getNoteComment(noteId,commentPage)
      if (res.data.data.length < 5) {
        this.setData({
          stopLoading: true
        })
      }
      if(commentPage===1){
        this.setData({
          comment:res.data.data,
          commentPage:2
        })
      }
      else{
        this.setData({
          comment:[...res.data.data,...comment],
          commentPage:this.data.commentPage+1
        })
      }
    },
    async loadMore(){
      const {comment,commentPage,stopLoading} = this.data
      const {noteId} = this.properties
      !stopLoading && this.getComment(noteId,commentPage,comment)
    }
    // editComment(e){
    //   this.setData({comment:e.detail});
    // },
  },
  lifetimes:{
    attached(){
      this.loadMore()
    }
  }
})
