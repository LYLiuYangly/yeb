
import axios from 'axios'
import router from '../router'
import {Message} from 'element-ui'

let base='/'


//请求拦截
axios.interceptors.request.use(config=>{
  //获取token，携带到请求头
  if(Window.sessionStorage.getItem('tokenStr')){
    config.headers['Authorization']=Window.sessionStorage.getItem('tokenStr')
  }else{
    Message.error("请重新登录")
  }
  return config
},error=>{
  Message.error(error)
})


//响应拦截
axios.interceptors.response.use(success=>{
  if(success.code===200){
    if(success.data.code===500||success.data.code===403||success.data.code===401){
      //500传入数据错误，403没有权限，401未登录
      //success={code:200,msg:'请登录',data：obj}
      Message.error(success.data.msg)
      return;
    }
    if(success.data.code===200){
      Message.success(success.data.msg)
    }
  }
},error=>{
  if(error.code===504||error.code===404){
    Message.error("网络异常，页面未找到")
  }else if(error.code===403){
    //未授权
    Message.error(error.msg)
  }else if(error.code===401){
    Message.error(error.msg)
    router.replace('/')
  }else{
    Message.error("未知错误！")
  }
})

//传入json参数格式的请求
export const postRequest=(url,params)=>{
  return axios({
    method:'POST',
    url:`${base}/${url}`,
    data:params
  })
}
export const getRequest=(url,params)=>{
  return axios({
    method:'GET',
    url:`${base}/${url}`,
    data:params
  })
}
export const putRequest=(url,params)=>{
  return axios({
    method:'PUT',
    url:`${base}/${url}`,
    data:params
  })
}
export const deleteRequest=(url,params)=>{
  return axios({
    method:'DELETE',
    url:`${base}/${url}`,
    data:params
  })
}