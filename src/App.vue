<template>
  <div class="head">
    <div class="head-container" v-show = "this.$route.meta.headShow">
      <div class="left-box">
        <router-link to="/">M</router-link>
      </div>
      <div class="right-box">
        <div>
          <el-input placeholder="请输入商品信息" size="medium">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="right-box-text">
          <router-link to="/homeall" active-class="on">全部商品</router-link>
          <span>捐赠</span>
        </div>
        <div class="line"></div>
        <div class="right-icon">
          <router-link to="/login">
            <i class="el-icon-user"></i>
          </router-link>
          <router-link to="/shopCar" class="shopCar">
            <i class="el-icon-shopping-cart-2"></i>
          </router-link>
        </div>
      </div>
    </div>
    <div class="scroll" v-show = "this.$route.meta.scrollShow">
      <div class="nav" :class="navBarFixed == true ? 'navBarWrap' : ''">
        <ul class="nav-sub">
          <li>
            <router-link to="/" active-class="active">首页</router-link>
          </li>
          <li>
            <router-link to="/homeall" active-class="active">全部</router-link>
          </li>
          <li>
            <router-link to="/" active-class="active"
              >后台管理系统</router-link
            >
          </li>
          <li>
            <router-link to="/" active-class="active"
              >XMall小程序</router-link
            >
          </li>
          <li>
            <router-link to="/" active-class="active"
              >XPay支付系统</router-link
            >
          </li>
          <li>
            <router-link to="/" active-class="active"
              >XBool开发平台</router-link
            >
          </li>
          <li>
            <router-link to="/" active-class="active">宣传视频</router-link>
          </li>
          <li>
            <router-link to="/" active-class="active">Github</router-link>
          </li>
          <li>
            <router-link to="/" active-class="active">商用授权</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class = 'rou-content'>
      <router-view></router-view>
    </div>
    <div class="footer"  v-show = "this.$route.meta.footerShow">
      <div class="footer-top">
        <ul>
          <li v-for="(item, index) in arrs" :key="index">
            <p v-for="(item, index) in item.a" :key="index">{{ item }}</p>
          </li>
        </ul>
        <div>
          <p>101239570</p>
          <p>周一至周日 10:00-23:00（限Starrer或捐赠人联系</p>
          <button>在线帮助</button>
        </div>
      </div>
      <div class="footer-bottom">
        <p>
          Copyright ©2017, exrick.cn Co., Ltd. All Rights
          Reserved.本网站设计内容大部分属锤子科技 法律声明隐私条款开发者中心
        </p>
        <p><span>蜀ICP备16030308号-1</span><span> 蜀ICP证16030308号</span></p>
      </div>
    </div> 
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      navBarFixed: false,
      arrs: [
        {
          a: ["订单服务", "购买指南", "支付方式", "送货政策"],
        },
        {
          a: ["服务支持", "官方开源", "项目前端", "项目后端"],
        },
        {
          a: ["自助服务", "个人博客", "个人简介", "个人视频"],
        },
        {
          a: ["其他项目", "XPay支付系统", "数据共享", "待开发..."],
        },
        {
          a: ["友情链接", "宇cccc", "Smartisan", "Vue"],
        },
        {
          a: ["关注我吧", "腾讯 QQ", "新浪微博", "官方邮箱"],
        },
      ],
      // datas:null
    };
  },
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
  },

  methods: {
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
      //  当滚动超过 90 时，实现吸顶效果
      if (scrollTop > 100) {
        this.navBarFixed = true;
      } else {
        this.navBarFixed = false;
      }
    },
    // async getTryData() {
    //   const { data } = await request.get("/try");
    //   this.datas = data.result;
    //   console.log(data);
    // }
  },
  created(){
    //  this.getTryData();
    console.log(this.$route.meta)
  }
};
</script>

<style>

.head {
  width: 100%;
  height: 100px;
  background: #000;
}
.head-container {
  width: 1220px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  font-weight: bolder;
  text-align: center;
  line-height: 40px;
}
.right-box {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #c8c8c8;
}
.right-box a {
  white-space: nowrap;
  padding: 0 25px;
}
.right-box-text {
  display: flex;
}
.line {
  width: 1px;
  height: 16px;
  background: #c8c8c8;
}
.right-icon {
  display: flex;
}
.right-box-text a {
  padding: 0 15px;
}
.right-icon a {
  padding: 0 15px;
  font-size: 16px;
  position: relative;
}
.right-box div {
  margin: 0 20px;
}
.shopCar::after {
  display: block;
  content: "0";
  width: 14px;
  height: 14px;
  position: absolute;
  right: 0;
  top: 0;
  background: #ccc;
  border-radius: 50%;
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 14px;
}

.nav {
  width: 100%;
  box-sizing: border-box;
  background: #f7f7f7;
  text-align: center;
  height: 90px;
}
.navBarWrap {
  position: fixed;
  top: 0;
  z-index: 999;
}

.nav-sub {
  width: 1220px;
  margin: 0 auto;
  /* background:yellow; */
  font-size: 12px;
  font-size: #666;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.nav-sub li {
  box-sizing: border-box;
  height: 90px;
  line-height: 90px;
  margin: 0 10px;
}
.nav-sub li:hover {
  color: #5692ed;
}
.active {
  font-weight: bolder;
}
.on {
  color: #fff;
}


.rou-content{
  width:100%;
  background:#ededed;
}
.footer {
  width: 100%;
  background: white;
}
 
.footer ul {
  display: flex;
  width: 50%;
  margin-left: 150px;
  justify-content: space-between;
}

.footer ul li {
  line-height: 25px;
  font-size: 12px;
  color: #969696;
  margin: 50px 0;
}

.footer ul li p:nth-child(1) {
  color: #000;
}
.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-top div {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 150px;
  
}

.footer-top div p:nth-child(1) {
  font-size: 30px;
}

.footer-top div p:nth-child(2) {
  font-size: 12px;
  color: #ccc;
  margin: 10px 0;
}

.footer-top button {
  background: rgb(252, 252, 252);
  color: rgb(97, 97, 212);
  border: 1px solid #ccc;
  font-size: 14px;
  width: 130px;
  height: 30px;
  border-radius: 5px;
}

.footer-bottom{
  border-top:1px solid rgb(219, 219, 219);
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}
.footer-bottom p{
  font-size: 12px;
  color:#666;
}
.footer-bottom p:nth-child(2){
  color:#bfbcbc;
  margin:10px 0;  
}



</style>
