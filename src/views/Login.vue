<template>
  <div>
    <el-form :rules="rules" ref="loginForm" :model='loginForm' class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop='username'>
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入账户"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input @click="captchaURLChange" type="text" v-model="loginForm.code" auto-complete="off" placeholder="点击图片更换验证码"></el-input>
        <img :src="captchaURL" style="width: 100px;height: 40px" alt="验证码"/>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%;" :disabled='loginButton'  @click='submitLogin'>登录</el-button>
    </el-form>
  </div>
</template>

<script>
  export default{
    name:"Login",
    data(){
      return {
        captchaURL:'/captcha?time='+new Date(),
        checked:true,
        loginButton:false,
        loginForm:{
          username:'admin',
          password:'123',
          code:''
        },
        rules:{
          username:[{required:true,message:'请输入账户',tigger:'blur'}],
          password:[{required:true,message:'请输入密码',tigger:'blur'},
                    {min:6,max:16,message:'密码长度6到16位',tigger:'blur'}],
          code:[{required:true,message:'请输入验证码',tigger:'blur'}]
          
        }
      }
    },
    methods:{
      captchaURLChange(){
        this.captchaURL='/captcha?time='+new Date()
      },
      submitLogin(){
        this.$refs.loginForm.validate((valid)=>{
         if(valid){
           console.log(this)
           this.router.replace('/home')
           this.postRequest('/login',this.loginForm).then(res=>{
             console.log(res)
           })
         } else{
           this.$message.error('请正确输入所有字段')
         }
        })
      }
    }
  }
</script>

<style>
  .loginContainer{
    width: 350px;
    margin: 100px auto;
    padding: 15px 35px 15px 35px;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    box-shadow: 0 0  25px #cac6c6;
  }
  .loginTitle{
    margin: 0 auto 40px auto;
    text-align: center;
  }
  .loginRemember{
    text-align: left;
    margin: 0 0 25px 0;
  }
  .el-form-item__content{
    display: flex;
    align-items: center;
  }

</style>
