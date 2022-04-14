import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta:{headShow:true,footerShow:true,scrollShow:true},
    component:HomeView
  },
  {
    path: '/homedetails/:detail',
    name: "homedetails",
    meta:{headShow:true,footerShow:true,scrollShow:true},
    component: () => import('../views/HomeDetails.vue'),
    props: true,
  },
  {
    path: "/shopCar",
    name: "shopCar",
    meta:{headShow:true,footerShow:true,scrollShow:false},
    component: () => import('../views/shopCar')
  },
  {
    path:"/login",
    name:"login",
    meta:{headShow:false,footerShow:false,scrollShow:false},
    component:()=>import('../views/login'),
    props:true
  },
  {
    path: '/homeall',
    name: "homeall",
    meta:{headShow:true,footerShow:true,scrollShow:true},
    component: () => import('../views/HomeAll.vue'),
  }
];

const router = new VueRouter({
  routes,
});
router.beforeEach(function(to,from,next){
  console.log(to,from)
  let token = localStorage.getItem('token')
  if(to.name === 'login'){
    next()
  }else if(token){
    next()
  }else{
    next({path:"/login"})
  }
})

export default router;
