export const request= async (url)=>{
  return new Promise((resolve, reject)=>{
    wx.request({
      url: url,
      header:{'user-id': 123456},
      success:(result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject()
      }
    })
  })
} 
export function getPercent(course){
  return request(`http://47.117.3.76/kpw/course/info/${course}`); 
}
export function getComment(course){
  return request(`http://47.117.3.76/kpw/review/queryByCode/${course}`); 
}