# 员工管理全栈开发手册

## 前端

### 1.搭建项目

vue create yeb

#### 安装Element-ui

项目目录：
> npm i element-ui -S

main.js
[官网Element-ui 引入](https://element.eleme.cn/#/zh-CN/component/quickstart)
```
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
vue.use(ElementUI)
```
### 2.登录页面
Login.vue 创建，路由配置
```
<el-form> 表单
表单对象  ref=ref=LoginForm
数据对象 :model=ref=LoginForm

<el-form-item> 表单子项  包裹input
v-model  双向绑定值
关闭自动补全 auto-complete=off

账户  密码  验证码  验证码图片  记住我  登录按钮
input input  input   img     checkbox  button
```
事件处理submitLogin
```
<el-form :rules='rules'>
rules:{
  //规则校验的是el-form-item中的 prop参数
  username:[{}],
  password:[{}],
  code:[{}]
}

验证失败处理
submitLogin(){
  this.$refs.loginFrom.validata(valid){
    if (valid)//成功 true{
      alter("成功")
    } else{
      this.$message.erro('请输入所有字段');
      return;
    }
  }
}
```

### 配置响应拦截器
npm install axios

单独导入element-ui 消息提示
import {Message} from 'element-ui'
配置拦截axios的interceptor
```
//成功请求到后端接口
axios.interceptor.response.use(success=>{
  if(后端请求成功==200)
    if(后端响应状态码判断) 500 401未登录 403未授权
      Message.error()
    if(后端响应成功)
      Message.success()
},error=>{
  if(后端请求错误状态码) 504 404
    Message.error(message:"")
   else if() 403权限不足
   else if() 401请登录
      router.replace('/')
   else
      if(message!=null)
        message.error('')
      else 未知错误
   return;
});
```

### 配置转发请求跨域
```
let base='';
export const postRequest=(url,params)=>{
  return axios({
    method:'post',
    url:`${base}/${url}`,
    data:params
  })
}
```
vue.config.js
```
let proxyObj={}
proxyObj['/']={
  //websocket
  ws:false,
  //目标地址
  target:'http://',
  //发送请求头host设置为target
  changeOrign:true,
  //不重写请求地址
  pathReWrite:{
    '^/':'/'
  }
}
module.exports={
  devServer:{
    host:'localhost',
    port:'8080',
    proxy:proxyObj
  }
}
```
### 登录成功跳转
获取响应内容中token 
存入SessionStorage
使用replace跳转  跳转后没有后退按钮
    push跳转     跳转后能后退

### 配置请求拦截器
每次请求把从SessionStorage获取token，加载header里面Authorization
### 完善4种请求 JSON 封装
post  put get delete
全局插件形式引入 
vue.prototype.postRequest=postRequest

### 添加loading动画
loading 官网