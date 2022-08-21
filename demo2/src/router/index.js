import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/user/Users.vue'
import Welcome from '../components/Welcome.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Echart from '../components/echars/echarts.vue'
import Order from '../components/order/order.vue'
import Cate from '../components/goods/cate.vue';



Vue.use(VueRouter)

const routes = [
  // 路由重定向   一进入页面自动进入登录页面
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '',

    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/reports', component: Echart },
      { path: '/orders', component: Order },
      { path: '/categories', component: Cate },


    ]
  }

]

const router = new VueRouter({
  routes
})

//路由守卫  固定写法  没登录的用户时无法访问其他页面 | 退出登录的也无法访问其他页面
//一共有三个参数  to 从哪来  from 到哪去  next 放行
router.beforeEach((to, from, next) => {
  //to即将访问的路径  from代表从哪个跳转而来  next是一个函数  代表执行下一步操作
  if (to.path === "/login") return next();
  //获取token
  const token = window.sessionStorage.getItem('token');
  if (!token) return next('/login');
  next();
})

export default router
