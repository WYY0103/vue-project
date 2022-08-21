import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用router插件
Vue.use(VueRouter);

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Search from '@/pages/Search';
import Register from '@/pages/Register';

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
export default new VueRouter({
    routes: [
        {
            path: "/home",
            component: Home,
            meta: { show: true }
        },
        {
            path: "/login",
            component: Login,
            meta: { show: false }
        },
        {
            // search要接收参数  路由进行占位
            path: "/search/:keyword?",
            component: Search,
            meta: { show: true },
            name: "search",
            props($route) {
                return { keyword: $route.params.keyword, k: $route.query.k }
            }
        },
        {
            path: "/register",
            component: Register,
            meta: { show: false }
        },
        {
            path: '/',
            redirect: '/home'
        }

    ]
})