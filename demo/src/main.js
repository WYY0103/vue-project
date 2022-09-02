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

// 分页器组件
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name,Pagination);


//将项目全部请求函数引入进来[分别暴露]  统一引入
import * as http from '@/api';


//element-ui按需引入
import { Button, Row, Col, MessageBox,Message,Input} from 'element-ui';
//element-ui大多数组件，注册为全局组件Vue.component|Vue.use
// Vue.use(Button);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(Input);
Vue.prototype.$msgbox = MessageBox;
//消息提示框
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;


// vue 挂载app
new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate(){
        Vue.prototype.$bus = this;
        Vue.prototype.$http = http;
    }
}).$mount('#app');
