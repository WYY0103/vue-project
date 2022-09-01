import Vue from 'vue';
import VueRouter from 'vue-router';
import route from './route';
//引入仓库
import store from '@/store';

// 使用router插件
Vue.use(VueRouter);

// 先保存一下原有的push方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push方法  location是要跳转的
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // 如果调用的push含有成功与失败的回调  则调用原先的push方法
        // 但要修改this指向VueRoute
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });

    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // 如果调用的push含有成功与失败的回调  则调用原先的push方法
        // 但要修改this指向VueRoute
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}


// 配置路由
const router = new VueRouter({
    routes: route,
    // return 期望滚动到哪个的位置  滚动条的位置
    scrollBehavior() {
        return { y: 0 }
    }
})

export default router;


//全局守卫:只要项目中有任何路由变化，全局守卫都会进行拦截【符合条件走你，不符合条件不能访问】
//全局守卫:全局前置守卫【访问之前进行触发】
//全局前置守卫
router.beforeEach(async (to, from, next) => {
    //to:去的那个路由的信息
    //from:从那个路由而来的信息
    //next:放行函数
    //第一种：next(),放行函数，放行到它想去的路由
    //第二种:next(path),守卫指定放行到那个路由去

    //用户是否登录:取决于仓库里面是否有token
    //每一次路由跳转之前需要用有用户信息在跳转,没有发请求获取用户信息在跳转
    //token
    let hasToken = store.state.user.token;
    //用户信息
    let hasNickName = store.state.user.nickName;
    //用户登录
    if (hasToken) {
        //用户登录了,不能去login
        if (to.path == "/login") {
            next('/home');
        } else {
            //用户登陆了,而且还有用户信息【去的并非是login】
            if (hasNickName) {
                next();
            } else {
                //用户登陆了,但是没有用户信息 
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //用户没有信息，还携带token发请求获取用户信息【失败】
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('logout');
                    //回到登录页，重新获取一个新的token
                    next('/login');
                }
            }
        }
    } else {
        //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
        //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
       next();
    }
});