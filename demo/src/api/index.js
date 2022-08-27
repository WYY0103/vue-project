// 管理所有api接口
import requests from "./axios";
import mockRequests from './mockAxios';

// 三级联动的接口
// 在这定义一个函数  对外暴露
// 这样接收请求的函数可以取到
// axios 返回的是一个promise对象
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList');

// 轮播图的请求接口  mock
export const reqGetBannerList = () => mockRequests.get('/banner');
// home 中floor的接口
export const reqGetFloorList = () => mockRequests.get('/floor');

// 获取搜索模块数据接口
// 带参数  发请求的时候需要传递参数  至少是{}
export const reqGetSearchInfo = (params) => requests({
    url: "/list",
    method: "post",
    data: params
})

// 获取商品详情
export const reqGetGoods = (skuId) => requests({ 
    url: `/item/${skuId}`, 
    method: 'get' 
});