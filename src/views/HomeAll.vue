<template>
  <div class="all">
    <ul class="nav-list">
      <li class="nav-item active" @click="zonghefn">综合排序</li>
      <li class="nav-item" @click="digaofn">价格从低到高</li>
      <li class="nav-item" @click="gaodifn">价格从高到低</li>
      <li class="nav-item price-interval">
        <input type="number" placeholder="价格" class="input" />
        <span style="margin: 0 5px">-</span>
        <input type="number" placeholder="价格" />
        <button type="primary" class="main-btn">确定</button>
      </li>
    </ul>
    <div class="all-main">
      <div class="all-goods">
        <div class="goods-box">
          <div class="goods-list">
            <div
              class="goods-item"
              v-for="(item, index) in all"
              :key="index"
              @click="detailfn(item.productId)"
            >
              <div class="goods-info">
                <div class="good-img">
                  <img :src="item.productImg" alt="" />
                </div>
                <h6 class="good-title">{{ item.productName }}</h6>
                <h3 class="sub-title">{{ item.subTitle }}</h3>
                <p class="good-price"><span>¥</span>{{ item.salePrice }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          pagecount="2"
          :total="40"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../api/index";
export default {
  name: "HomeAll",
  data() {
    return {
      all: null,
    };
  },
  methods: {
    detailfn(id) {
      this.$router.push({name:"homedetails",params:{productId:id}})
    },
    zonghefn() {
      this.getall();
    },
    digaofn() {
      this.all.sort(function (a, b) {
        return a.salePrice - b.salePrice;
      });
    },
    gaodifn() {
      this.all.sort(function (a, b) {
        return b.salePrice - a.salePrice;
      });
    },
    async getall() {
      let { data } = await request.get("/all");
      // console.log(data);
      this.all = data;
    },
  },
  created() {
    this.getall();
  },
};
</script>

<style scoped>
/* 分页器开始 */
.pagination {
  width: 1220px;
  margin: 0 auto;
  text-align: right;
}
/* 分页器结束 */
/* goods开始 */
.goods-box {
  width: 1220px;
  margin: 0 auto;
  display: flex;
  /* flex-direction: column; */
}
.goods-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.goods-item {
  width: 25%;
  height: 430px;
  background: #fff;
}
.good-img {
  width: 206px;
  height: 206px;
  margin: 50px auto 10px;
}
.good-img img {
  width: 100%;
  height: 100%;
}
.good-title {
  color: #424242;
  line-height: 1.2;
  padding: 10px;
  text-align: center;
  margin: 0 auto;
  padding: 0 14px;
  overflow: hidden;
}
.sub-title {
  font-size: 12px;
  color: #d0d0d0;
  text-align: center;
  line-height: 1.2;
  padding: 10px;
}
.good-price {
  text-align: center;
  line-height: 30px;
  color: #d44d44;
  font-size: 18px;
  font-weight: 700;
}
.good-price span {
  font-size: 12px;
}
/* goods结束 */
/* nav开始 */
.all {
  background: rgb(236, 235, 235);
}
.nav-list {
  width: 1220px;
  height: 60px;
  line-height: 60px;
  display: flex;
  margin: 0 auto;
}
.nav-item {
  padding: 0 15px;
  height: 100%;
  font-size: 12px;
  color: #666;
  cursor: pointer;
}
.nav-item.active {
  color: #5683ea;
}
.price-interval {
  display: flex;
  align-items: center;
  justify-content: center;
}
.price-interval input {
  width: 80px;
  height: 30px;
  border: 1px solid #ccc;
  text-align: center;
  border-radius: 5px;
  background: none;
}
.price-interval button {
  width: 80px;
  height: 30px;
  font-size: 12px;
  color: #fff;
  background: #678ee7;
  border: none;
  outline: none;
  margin-left: 10px;
}
/* nav结束 */
</style>