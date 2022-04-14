const Mock = require('mockjs');
const userInfo = [
  {
    username:"ypy123456",
    password:"ypy123456"
  },
  {
    username:"yjf123456",
    password:"yjf123456"
  },
  {
    username:"wxt123456",
    password:"wxt123456"
  },
]
Mock.mock("/api/login","post",function(config){
  console.log(config)
  const data = JSON.parse(config.body);
  console.log(data)
  let result = userInfo.some(item=>item.username == data.user && item.password == data.psw)
  if(result){
    return {
      status:200,
      message:"success",
      token:"good",
      user:data.user
    }
  }else{
    return {
      status:200,
      message:"fail",
      data:"用户民或密码不正确"
    }
  }
})
