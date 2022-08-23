// 管理所有api接口
import requests from "./request";
import mockRequests from './mockAjax';

// 三级联动的接口
// /api/product/getBaseCategoryList   get请求  无参数
export const reqCategoryList = () => {
    // 在这定义一个函数  对外暴露
    // 这样接收请求的函数可以取到
    // axios 返回的是一个promise对象
    return requests({
        url: '/product/getBaseCategoryList',
        methods: 'get'
    });
}

// 轮播图的请求接口  mock
export const reqGetBannerList = () => mockRequests.get('/banner');

