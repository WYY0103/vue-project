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
    method: 'get',
});

// 将产品添加购物车当中（更新某一个产品的个数）
export const reqAddShoppingCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
})

// 获取购物车列表的接口
export const reqGetShoppingCart = () => requests({
    url: '/cart/cartList',
    method: 'get'
})

// 删除购物车商品
export const reqDeleteCart = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 切换商品选中状态
export const reqCheckCartChecked = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

// 获取验证码的接口
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

//注册的接口
export const reqRegister = (data) => requests({
    url: `/user/passport/register`,
    method: 'post',
    data
});

// 登录的接口: 请求体携带参数 phone&& password
export const reqUserLogin = (data) => requests({
    url: `/user/passport/login`,
    method: 'post', data
});

//获取用户登录成功以后用户信息的接口
export const reqUserInfo = () => requests({
    url: `/user/passport/auth/getUserInfo`,
    method: 'get'
});

//退出登录业务
export const reqUserLogout = () => requests({
    url: `/user/passport/logout`,
    method: 'get'
});

//获取用户地址信息
export const reqAddressInfo = () => requests({
    url: `/user/userAddress/auth/findUserAddressList`,
    method: 'get'
});


//获取商品清单数据
export const reqShopInfo = () => requests({
    url: `/order/auth/trade`,
    method: 'get'
});


//提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data
});

//获取支付信息接口
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
});

//查询支付结果
export const reqPayResult = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
});

//获取我的订单
export const reqMyOrderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
});