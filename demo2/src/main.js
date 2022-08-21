import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'


import echarts from 'echarts'

import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table',TreeTable);



// 设置接口地址
axios.defaults.baseURL='http://vueshop.pixiv.download/api/private/v1/'
// 将axios挂载到vue原型上
Vue.prototype.$http = axios

// 在main.js 当中  去定义自己的过滤器  （含义: 把我的数据 去做成我想要的格式）
// dateFormat 这是咱们定义的过滤器的函数名
Vue.filter('dateFormat', function (originVal) {
	const dt = new Date(originVal)
	const year = dt.getFullYear()
	const month = (dt.getMonth() + 1 + '').padStart(2, '0')
	const day = (dt.getDate() + '').padStart(2, '0')
	const hour = (dt.getHours() + '').padStart(2, '0')
	const minute = (dt.getMinutes() + '').padStart(2, '0')
	const second = (dt.getSeconds() + '').padStart(2, '0')
	
	// 可注意的点  就是必须得有return  
	// 什么叫过滤器
	// 在项目当中 哪点使用过vue的过滤器  处理时间戳的时候进行使用  订单板块
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})
  


//axios 请求预处理  不用特殊的记  能找到地方复制粘贴就行
axios.interceptors.request.use(config=>{
	//像header请求头当中添加参数
	config.headers.Authorization = window.sessionStorage.getItem('token');

	//一定要有返回  才能生效
	return config;
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
