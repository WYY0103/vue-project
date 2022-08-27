import Vue from 'vue';
import VueRouter from 'vue-router';
import route from './route'

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
export default new VueRouter({
    routes: route,
    // return 期望滚动到哪个的位置  滚动条的位置
    scrollBehavior() {
        return { y: 0 }
    }
})