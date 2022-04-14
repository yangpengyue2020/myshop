<template>
  <div class = 'shopCart'>
    <div class= 'title'>购物清单</div>
    <el-result  subTitle="你的购物车空空如也" v-show = 'lists.length==0'>
      <template slot="icon">
        <el-image src="https://img2.baidu.com/it/u=1119570978,3049497231&fm=253&fmt=auto&app=138&f=JPEG?w=625&h=500"></el-image>
      </template>
      <template slot="extra">
        <el-button type="primary" size="medium">现在选购</el-button>
      </template>
    </el-result>
    <div v-show = 'lists.length>0'>
      <div class = 'shop-title'>
        <div class = 'shop-left'>商品信息</div>
        <div class = 'shop-right'>
          <span>单价</span>
          <span>数量</span>
          <span>小计</span>
          <span>操作</span>
        </div>
      </div>
      <ul class="shopList">
        <li v-for = '(item,index) of lists' :key = 'index' >
          <div class="checke">
            <i  @click = 'checkfn(index)' :class = 'item.check==true?"selectedCheck":""' ></i>
          </div>
          <div class="shopInfo">
            <div>
              <img :src="item.img" alt="" class = 'shopImg'>
              <span class = 'name'>{{item.name}}</span>
            </div>
            <div class = 'computedInfo'>
              <div><span>{{item.price|moneyText}}</span></div>
              <div class = 'computedNum'>
                <span class = 'minus' @click = 'minusNum(index)' disabled></span>              
                <!-- <span class = 'num'>{{num}}</span> -->
                <input type="text" v-model.number= "item.num">
                <span class = 'add' @click = 'addNum(index)'></span>
              </div>
              <div>{{item.price*item.num |moneyText}}</div>
              <div class = 'deleteProduct'><span @click = "removeShop(item)"></span></div>
            </div>  
          </div>
        </li>
        
        
      </ul>
      <div class = 'footer'>
        <div class="footer-left">
          <div class = 'allCheck'>
            <i :class = 'allCheck == true?"selectedCheck":""' @click = 'all()'></i>
            <span>全选</span>
          </div>
          <div>删除选中的商品</div>

        </div>
        <ul class="footer-right">
        <li>
          <div>已选中<span class = 'selectedCount'>{{selectedCount}}</span>件商品</div>
          <div>共计<span class = 'totalCount'>{{totalCount}}</span>件商品</div>
        </li> 
        <li>
          <div>应付总额:<span class = 'totalPrice'>{{totalPrice |moneyText}}</span></div>
          <div>应付总额不含运费</div>
        </li> 
        <li>
          <button class = 'btn'>现在结算</button>
        </li>
        </ul>
      </div>
    </div>
   
  </div>
</template>

<script>
import request from '@/api'
export default {
  name: 'shopCar',
  data() {
    return {

      lists:[],
      allCheck:true,
      dialogVisible: false
    };
  },
  created(){
   this.getShopData()
  },
  mounted() {
    
  },
  filters:{
    moneyText(val){
      return '￥'+val
    }
  },
  computed:{
    sumPrice(){
      return this.price*this.num
    },
    totalPrice(){   
      return this.lists.filter(item=>item.check == true).reduce((pre,cur)=>{
        return pre +cur.num*cur.price
      },0)
    },
    //共计数量
    totalCount(){
      return this.lists.reduce((pre,cur)=>{
        return pre+ cur.num
      },0);
    },
    //选中数量
    selectedCount(){
      return this.lists.filter(item=>item.check == true).reduce((pre,cur)=>{
        return pre+ cur.num
      },0);
    }
  },

  methods: {

   async getShopData(){
     console.log(1)
     const {data} = await request.get('/shop1');
     this.lists = data;
     console.log(data)
   },

    //用户删除行为
         //确定删除框
    removeShop(item){
        item.check == true&&this.$msgbox({
          title: '删除',
          message:'确定删除吗',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '删除中...';
              setTimeout(() => {
                done();
                 this.deleteCarts(item.id)
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 30);
              }, 300);
            } else {
              done();
              this.$message({
              type: 'warning',
              message: '删除失败'
            });
            }
          }
        }).then(() => {
         
            this.$message({
              type: 'success',
              message: '删除成功'
            });
         
        });
             
        
    },

  
    //用户删除业务
    async deleteCarts(id){
      const data = await request.delete('/deleteCarts/'+id)
      console.log(data)
      this.getShopData()
    },

    all(){
      this.allCheck = !this.allCheck    
      if(this.allCheck){
        this.lists.forEach(item => {
          item.check = true
        });
      }else{
        this.lists.forEach(item => {
          item.check = false
        });
      } 
    },
    addNum(index){
      this.lists[index].num++
    },
    minusNum(index){
      if(this.lists[index].num>1){
        this.lists[index].num--
      }
    },
    checkfn(index){
      if(this.lists[index].check){
        this.allCheck = false
        this.lists[index].check = !this.lists[index].check
      }else{
         this.lists[index].check = !this.lists[index].check
         let isFlag = this.lists.every((item,index)=>{
           return item.check == true
         })
         if(isFlag){
            this.allCheck =true
         }
      }
    }
  },
};
</script>

<style  scoped>

.shopCart .title{
  width:100%;
  height:59px;
  background:url("../../assets/shopCar/bg.png");
  border-radius: 5px 5px 0 0;
  box-sizing: border-box;
  line-height:60px;
  padding:0 10px 0 24px;
}
.shop-title{
  height:36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size:12px;
  color:#999;
  background:#eee;
  border:1px solid #ccc;
  border-left:none;
  border-right:none;
}

.shop-right{
  display:flex;  
}
.shop-left{
  margin-left:30px;  
}
.shop-right span{
  width:137px;
  text-align: center;
  
}

.shopImg{
  width:80px;
  height:80px;
}
.checke{
  display: flex;
  justify-content: center;
}
.checke i{
  display: block;
  margin-top:60px;
  width:20px;
  height:20px;
  background:url("../../assets/shopCar/icon.png") no-repeat 0 -20px;
}
.checke .selectedCheck{
  background:url("../../assets/shopCar/icon.png") no-repeat 0 0;
}

.shopList li{
  display: flex;
  background:#fff;
  
}
.shopList .checke{
  width:110px;
  height:100%;
  /* background:pink; */
}

.shopInfo{
  flex:1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.computedInfo{
  display: flex;
  align-items: center;
  
}
.computedInfo div{
  width:137px;
  /* background:blue ; */
  text-align: center;
  align-items: center;
  height:140px;
  line-height:140px;
}

.computedNum{
  display: flex;
  align-items: center;
}
.computedNum span,.computedNum input{
  width:34px;
  height:34px;
  /* background:yellow; */
  line-height:34px;
  text-align: center;
}
.computedNum .add{
  background:url("../../assets/shopCar/icon3.jpg") no-repeat 0 0;
  background-size:100%;
}
.computedNum .minus{
  background:url("../../assets/shopCar/icon3.jpg") no-repeat 0 -60px;
  background-size:100%;
}
.deleteProduct span{
  display: inline-block;
  width:24px;
  height:24px;
  background:url("../../assets/shopCar/icon1.jpg") no-repeat 0 0 ;
  background-size:100%;
}
.footer{
  width:100%;
  height:90px;
  /* background:pink; */
  border-top:1px solid #ccc;
  background:#fafafa
}
.footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 30px;
  box-sizing: border-box;
}
.footer-left{
  display: flex;
  align-items: center;
}
.footer-left i{
  display:inline-block;
  width:20px;
  height:20px;
  background:url("../../assets/shopCar/icon.png") no-repeat 0 -20px;
  margin-right:10px;
  margin-left:10px;
}
.footer-left .selectedCheck{
   background:url("../../assets/shopCar/icon.png") no-repeat 0 -0px;
}
.allCheck{
   display: flex;
  align-items: center;
  margin-right:10px;
}


.footer-right{
  display: flex;
}
.footer-right li{
  margin-right:30px;
}
.footer-right li:first-child{
  border-right:1px solid #999;
  padding-right:30px;
}
.footer-right li:last-child{
  margin-right:0;
}
.btn{
  width:130px;
  height:50px;
  background:#567ee1;
  color:#fff;
  border:none;
  outline:none;
  border-radius: 5px;;
}

input{
  border:none;
  outline: none;
}
.shopCart{
  width:1220px;
  margin:0 auto;
  /* background:red; */
  border-radius: 5px;;
  border:1px solid #ccc;
}
.selectedCount{
  color:red;
  padding:0 10px;
  font-weight:bolder;
}
.totalCount{
  padding:0 10px;
  font-weight:bolder;
}
.totalPrice{
  color:red;
  padding:0 10px;
  font-weight:bolder;
}

</style>