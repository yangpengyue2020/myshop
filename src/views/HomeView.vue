<template>
  <div>
    <div class="home">
      <!-- 轮播 -->
      <div class="block">
        <el-carousel height="500px">
          <el-carousel-item
            v-for="(item, index) in datas[0].panelContents"
            :key="index"
          >
            <img :src="item.picUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--  -->
      <ul>
        <li v-for="(item, index) in datas[1].panelContents" :key="index">
          <img :src="item.picUrl" alt="" />
        </li>
      </ul>
      <div class="hots">
        <div class="title">热门商品</div>
        <div class="main">
          <div v-for="(item, index) in datas[2].panelContents" :key="index">
            <img :src="item.picUrl" alt="" />
            <p>{{ item.productName }}</p>
            <p>{{ item.subTitle }}</p>
            <div class="btn">
              <button @click="lookOver(item)">查看详情</button>
              <button @click="addCart(item)">加入购物车</button>
            </div>
          </div>
        </div>
      </div>
      <div class="concentration">
        <div class="title">官方精选</div>
        <ul class="main">
          <li v-for="(item, index) in datas[3].panelContents" :key="index">
            <img :src="item.picUrl" alt="" />
            <p>{{ item.productName }}</p>
            <p>{{ item.subTitle }}</p>
            <div class="btns">
              <button  @click="lookOver(item)">查看详情</button>
              <button @click="addCart(item)">加入购物车</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="brand">
        <div class="title">品牌周边</div>
        <ul class="main">
          <li v-for="(item, index) in datas[4].panelContents" :key="index">
            <img :src="item.picUrl" alt="" />
            <p>{{ item.productName }}</p>
            <p>{{ item.subTitle }}</p>
            <div class="btns">
              <button @click="lookOver(item)">查看详情</button>
              <button @click="addCart(item)">加入购物车</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="authority">
        <div class="title">品牌精选</div>
        <ul class="main">
          <li v-for="(item, index) in datas[5].panelContents" :key="index">
            <img :src="item.picUrl" alt="" />
            <p>{{ item.productName }}</p>
            <p>{{ item.subTitle }}</p>
            <div class="btns">
              <button @click="lookOver(item)">查看详情</button>
              <button @click="addCart(item)">加入购物车</button>
            </div>
          </li>
        </ul>
      </div>
      <ul class="lists">
        <li v-for="(item, index) in datas[6].panelContents" :key="index">
          <img :src="item.picUrl" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import request from "@/api";
export default {
  name: "HomeView",
  data() {
    return {
      datas: null,
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
    };
  },
  components: {},
  methods: {
    async getTryData() {
      const { data } = await request.get("/try");
      this.datas = data.result;
      console.log(data);
      console.log(this.datas)
    },
    addCart(item) {
      console.log(item);
    },
    lookOver(item){
      console.log(item.productId)
      this.$router.push({name:"homedetails",params:{productId:item.productId}})
    }
  },
  created() {
    this.getTryData();
  },
};
</script>
<style  scoped>
@import url("../style/Myhome/myhome.css");
</style>
