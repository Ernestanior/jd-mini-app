
const base_url='https://api.reviewonclass.com'
export const get= async (url)=>{
  const {token} = wx.getStorageSync("user-token")
  // console.log(url);
  // console.log(token);
  return new Promise((resolve, reject)=>{
    wx.request({
      url: url,
      // header:{'user-id': 123456},
      header:{'AUTH': token},
      success:(result)=>{
        // console.log(result);
        if (result.data.code===444) {
          wx.showToast({
            title: '登录过期',
          })
          wx.showLoading({
            title: '加载中',
          })
          wx.removeStorageSync('userinfo')
          wx.hideLoading()
          wx.redirectTo({
            url: '/pages/mine/index',
          })
          return
        }
        resolve(result)
      },
      fail:(err)=>{
        console.log(err);
        reject()
      }
    })
  })
} 
export const post= async (url,data)=>{
  const {token} = wx.getStorageSync("user-token")
  // console.log(url);
  // console.log(data);
  // console.log(token);
  return new Promise((resolve, reject)=>{
    wx.request({
      method:"POST",
      url: url,
      data,
      header:{'AUTH': token},
      success:(result)=>{
        if (result.data.code===444) {
          wx.showToast({
            title: '登录过期',
          })
          wx.showLoading({
            title: '加载中',
          })
          wx.removeStorageSync('userinfo')
          wx.hideLoading()
          wx.redirectTo({
            url: '/pages/mine/index',
          })
          return
        }
        resolve(result)
      },
      fail:(err)=>{
        console.log('please login');
        reject()
      }
    })
  })
} 
export const deleteApi= async (url,data)=>{
  const {token} = wx.getStorageSync("user-token")
  return new Promise((resolve, reject)=>{
    wx.request({
      method:"DELETE",
      url: url,
      data,
      header:{'AUTH': token},
      success:(result)=>{
        console.log(result);
        if (result.data.code===418) {
          wx.showToast({
            title: '登录过期',
          })
          wx.showLoading({
            title: '加载中',
          })
          wx.removeStorageSync('userinfo')
          wx.hideLoading()
          wx.redirectTo({
            url: '/pages/mine/index',
          })
          return
        }
        resolve(result)
      },
      fail:(err)=>{
        console.log('please login');
        reject()
      }
    })
  })
} 
export const upload_file=(e,nid)=>{
  const {token} = wx.getStorageSync("user-token")
  wx.uploadFile({
      url:`${base_url}/note/savePics/${nid}`,
      filePath: e,//图片路径
      name: "pics",
      header: {
          "Content-Type": "multipart/form-data",
          'AUTH': token
      },
      success: function(a) {
          // console.log(a);
      },
      fail: function(a) {
          wx.showToast({
              title: "上传失败",
              icon: "none",
              duration: 3000
          });
          // console.log(a);
      },
      complete:function(a){
        console.log(a);
      }
  });
}
//发送code获取用户token
export function getToken(code){
  return post(`${base_url}/user/code`,code); 
}
//发送用户昵称和头像给后台
export function updateUserInfo(data){
  return post(`${base_url}/user/addOrUpdate`,data); 
}
export function getPercent(course){
  return get(`${base_url}/course/info/${course}`); 
}
export function getComment(course){
  return get(`${base_url}/review/queryByCode/${course}`); 
}
// 获取搜索条件获取jd列表
export function getJdList(data){
  return post(`${base_url}/jd/list`,data); 
}

// 获取所有城市
export function getCity(){
  return get(`${base_url}/city/all`); 
}

// 每日推荐jd列表
export function getRecJd(city){
  return get(`${base_url}/jd/recWithCity?city=${city}`); 
}
// 根据id获取jd详情
export function getJdDetail(data){
  return get(`${base_url}/jd/query/${data}`); 
}
// jd收藏列表查询
export function getJdCollect(data){
  const {pageNum,pageSize}=data
  return get(`${base_url}/jd/queryFavorite?pageNum=${pageNum}&pageSize=${pageSize}`); 
}
// 添加jd收藏
export function addJdCollect(jdId,flag){
  return post(`${base_url}/jd/addFavorite/${jdId}/${flag}`); 
}

// 测试获取渲染md文件
export function getMd(){
  return get(`${base_url}/notes/u1/csse1001/week1/testRemotePic.md`); 
}
// 获取推荐笔记
export function getRecNote(data){
  return get(`${base_url}/note/rec`); 
}
// 根据课程号搜索笔记
export function getNoteByCourse(data){
  const {uniId,courseCode,pageNum,pageSize}=data
  return get(`${base_url}/note/query/${uniId}/${courseCode}?pageNum=${pageNum}&pageSize=${pageSize}`); 
}

// 根据用户id搜索笔记
export function getNoteById(data){
  const {AuthorId,pageNum,pageSize}=data
  return get(`${base_url}/note/queryByAuthorId/${AuthorId}?pageNum=${pageNum}&pageSize=${pageSize}`); 
}
// 根据笔记id搜索主评论
export function getNoteComment(noteId,pageNum){
  return get(`${base_url}/review/queryByCode/${noteId}?pageNum=${pageNum}&pageSize=10`); 
}
// 根据笔记id和主评论id获取子评论
export function getSubComment(noteId,parentId,pageNum){
  return get(`${base_url}/review/querySubReviews/${noteId}/${parentId}?pageNum=${pageNum}&pageSize=5`); 
}
// 根据笔记id新增评论
export function newComment(data){
  return post(`${base_url}/review/new`,data); 
}
// 点赞/取消点赞评论
export function likeComment(nid,rid,flag){
  return post(`${base_url}/review/like/${nid}/${rid}/${flag}`); 
}
// 获取笔记收藏列表
export function getFavNote(data){
  const {pageNum,pageSize}=data
  return get(`${base_url}/note/fav/list?pageNum=${pageNum}&pageSize=${pageSize}`); 
}
// 根据笔记id获取详情
export function getNoteDetail(nid){
  return get(`${base_url}/note/${nid}`); 
}
// 发布笔记
export function publishNote(data){
  return post(`${base_url}/note/new`,data); 
}
// 收藏/取消笔记
export function favNote(nid,flag){
  return post(`${base_url}/note/fav/${nid}/${flag}`); 
}
// 点赞/取消笔记
export function likeNote(nid,flag){
  return post(`${base_url}/note/like/${nid}/${flag}`); 
}
// 删除笔记
export function deleteNote(nid){
  return deleteApi(`${base_url}/note/del/${nid}`); 
}


export const aplipay= async (params,data,method="POST")=>{
  const aliUrl = "https://openapi.stable.dl.alipaydev.com/gateway.do"
  let param = ''
  Object.keys(params).forEach(item=>{
    param += `${item}=${params[item]}&`
  }) 
  param = param.substring(0,param.length-1)
  console.log(param);

  return new Promise((resolve, reject)=>{
    wx.request({
      method,
      url:`${aliUrl}?${param}`,
      data,
      // header:{'AUTH': token},
      success:(result)=>{
        console.log(result);
        resolve(result)
      },
      fail:(err)=>{
        console.log(err);
        reject()
      }
    })
  })
} 

export const getSchool = ()=>{
  return aplipay({timestamp:'2013-01-01 08:08:08',method:'alipay.overseas.open.school.query',app_id:"wxf507b42a5cd77760"},{school_name:"Berkeley College"})
}