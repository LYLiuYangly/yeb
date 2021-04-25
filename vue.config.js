let proxyObj={}

proxyObj['/']={
  //webSocket
  ws:false,
  //目标地址
  target:'http://localhost:8081',
  //发送请求头的host设置为target
  changeOrign:true,
  //不重写请求地址
  pathReWrite:{
    '^/':'/'
  }
}


module.exports={
  devServer:{
    host:'localhost',
    port:'8081',
    proxy:proxyObj
  }
}