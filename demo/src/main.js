import Vue from 'vue'
import App from './App.vue'

import router from '@/router';
import store from '@/store';



Vue.prototype.$store = store

// 三级联动的组件  全局组件
import TypeNav from '@/components/TypeNav';
// 参数：全局组件的名字，哪一个组件
Vue.component(TypeNav.name, TypeNav);

// 引入mock数据
import '@/mock/mockServe';
// 引入swiper样式
import "swiper/css/swiper.css";
// 轮播图全局组件
import Carousel from '@/components/Carousel';
Vue.component(Carousel.name, Carousel);




// vue 挂载app
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
