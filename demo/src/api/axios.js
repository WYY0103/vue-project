import axios from "axios";
// 引入进度条
// start 进度条开始
// done 进度条结束
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";

// 对axios进行二次封装
// 1 利用axios对象的create方法，创建axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径  发请求的时候，路径都会出现api
    baseURL:"/api",
    // 请求超时的时间
    timeout:5000
})

// 请求拦截器  发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些操作
requests.interceptors.request.use((config)=>{
    // config  配置对象  对象里面有一个header属性很重要   请求头
    nProgress.start();
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    return config;
})

// 相应拦截器  有成功与失败的回调
requests.interceptors.response.use((res)=>{
    nProgress.done();
    return res.data;
},(error)=>{
    alert(error.message)
    return new Promise();
})


export default requests;