const Mock = require('mockjs');
const carts = [
  {
    img:"https://resource.smartisan.com/resource/3a7522290397a9444d7355298248f197.jpg",
    name:"坚果3前屏钢化玻璃保护膜",
    num:1,
    price:30,
    check:true,
    id:1111

  },
  {
    img:"https://resource.smartisan.com/resource/3a7522290397a9444d7355298248f197.jpg",
    name:"坚果3前屏钢化玻璃保护膜",
    num:3,
    price:50,
    check:true,
    id:2222
  },
  
]
Mock.mock('/api/shop',carts)

// Mock.mock(/\/api\/deleteCarts\/\d/,'delete',function(config){
//   console.log(config)
//   const id = config.url.split('/').pop()
//   console.log(id)
//   let index = carts.findIndex((item,index)=>{
//     return item.id == id
//   })
//   console.log(index)
//   carts.splice(index,1)
//   return {
//     status:200,
//     message:'success',
//     data:carts
//   }
// })

