<template>
  <div class = 'login'>
    <div class = 'iconText'>M</div>
    <div class = 'txt'>使用XMall账号登录官网</div>
    <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="demo-ruleForm">
    <el-form-item  prop="username">
      <el-input type="text" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item  prop="password">
      <el-input type="password" v-model="ruleForm.password"  placeholder="请输入密码"></el-input>
    </el-form-item>
    <div class = 'keepPassword'>
       <el-checkbox v-model="checked" @change= 'keepPsw'>记住密码</el-checkbox>
       <div>
         <span class = 'register'>注册XMall账号</span>
         <span>忘记密码</span>
       </div>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" class = 'btn'>登录</el-button>
      <el-button @click="resetForm('ruleForm')" class = 'btn'>返回</el-button>
    </el-form-item>
    <div class= 'otherLogin'>
      其他账号登录：
      <span @click="open2"></span>
      <span @click="open2"></span>
      <span @click="open2"></span>
    </div>
   
  </el-form>


  </div>
</template>

<script>
import request from '@/api'
export default {
  name: 'loginPage',

  data() {
  
      var passwordfn = (rule, value, callback) => {
       let userRex = /^[a-zA-Z][a-zA-Z\d]{5,11}$/
        if (value === '') {
          callback(new Error('密码不能为空'));
        }
        if(userRex.test(value)) return 
        return callback('用户名格式不正确')
      };
      var usernamefn = (rule, value, callback) => {
        let userRex = /^[a-zA-Z][a-zA-Z\d]{5,11}$/
        if (value === '') {
          callback(new Error('用户名不能为空'));
        }
        if(userRex.test(value)) return 
        return callback('用户名格式不正确')

      };
    return {
      checked: false,
      ruleForm: {
          password: "",
          username: ""
        },
      rules: {
        password: [
          { validator: passwordfn, trigger: 'blur' }
        ],
        username: [
          { validator: usernamefn, trigger: 'blur' }
        ]
        
      }
    };
  },

  mounted() {
    
    this.getLocalStorageUser()
  },

  methods: {
    //点击微信、qq的提示信息
     open2() {
        this.$notify({
          title: '待开发',
          message: '此功能开发中……',
          type: 'warning'
        });
      },

    //获取本地存储的账号和密码
    getLocalStorageUser(){
      if(localStorage.getItem("user")){
          this.ruleForm.password = JSON.parse(localStorage.getItem("user")).psw 
        this.ruleForm.username = JSON.parse(localStorage.getItem("user")).user
      }
    },

    //记住密码
    keepPsw(val){
      this.checked = val;
      console.log(this.checked)
      let user = this.ruleForm.username
      let psw = this.ruleForm.password
      if(this.checked){
         localStorage.setItem("user",JSON.stringify({user,psw}))
      }  
    },

    //提交业务

    //用户点击提交
     submitForm() {
       console.log(1)
      this.sendPassAndUser()
      },

      //登录业务
      async sendPassAndUser(){
        let user = this.ruleForm.username
        let psw = this.ruleForm.password
        let {data} = await request.post("/login",{user,psw})
        console.log(data) 
        if(data.message == 'success'){
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success',
            
            onClose:()=>{
              let token = data.token;
              localStorage.setItem("token",token)
              this.$router.push({path:"/"})
              let user = this.ruleForm.username
              let psw = this.ruleForm.password
              this.checked&&localStorage.setItem("user",JSON.stringify({user,psw}))
            }
          });      
        }else{
           this.$message({
            showClose: true,
            message: '用户名或密码错误',
            type: 'fail',
            onClose:()=>{
              this.ruleForm.username=""
              this.ruleForm.password=""
            }
          });   
        }

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
};
</script>

<style  scoped>
.login{
  width:360px;
  height:500px;
  border:1px solid #ccc;
  box-shadow: 2px 2px 2px 2px #eee;
  border-radius: 10px;
  background: linear-gradient(#fff,#eff0ef);
  position:fixed;
  left:50%;
  top: 50%;
  transform: translate(-50%,-50%);
  padding:36px;
}
.iconText{
  width:90px;
  height:90px;
  background:#d51e06;
  color:#fff;
  border-radius: 50%;
  font-size:48px;
  line-height:90px;
  text-align: center;
  margin:0 auto 36px;
  
}
.txt{
  margin-bottom:36px;
  font-size:18px;
  text-align: center;
}
.keepPassword{
  display: flex;
  justify-content: space-between;
  color:#3a8ee6;
  font-size:12px;
}
.register{
  padding:0 10px;
  border-right:1px solid #ccc;
  margin-right:10px;
  
}
.el-form-item__content{
  
  display: flex;
  flex-direction: column;
}
.btn{
  width:100% !important;
  margin-top:20px;
}
.el-button+.el-button{
  margin-left:0;
}
.otherLogin{
  display: flex;
  font-size:14px;
  align-items: center;
}
.otherLogin span{
  width:16px;
  height:17px;
  background:url("../../assets/shopCar/other-login.png") no-repeat;
  padding:0 5px;
} 
.otherLogin :nth-child(1){
  
  background-position: 0,0;
}
.otherLogin :nth-child(2){
  background-position: -32px,0;
}
.otherLogin :nth-child(3){
  background-position: -64px,0;
}

</style> 