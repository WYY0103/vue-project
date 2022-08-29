import { reqGetGoods,reqAddShoppingCart } from '@/api';
import {getUUID} from '@/utils/uuid_token';

const state = {
    goodsInfo: {},
    // 游客临时身份 存储到本地存储中
    // getUUID 获取游客身份
    uuid_token:getUUID(),
};
const mutations = {

    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
};
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        let res = await reqGetGoods(skuId);
        if (res.code == 200) {
            commit("GETGOODSINFO", res.data);
        }
    },
    // 加入购物车
    async updateShoppingCart({commit},{skuId,skuNum}){
        let res = await reqAddShoppingCart(skuId,skuNum);
        // 加入购物车只是通知服务器里面数据更新
        // 无需存储在vuex里面
        // 这里需要返回成功与失败的标记  用于组件接收是否成功进行接下来的操作
        if(res.code == 200){
            // 返回成功的标记 组件接收后进行路由跳转
            return "OK"
        }else{
            // 返回失败的标记 组件接收后给用户提示操作失败
            return Promise.reject(new Error('ERROR'));
        }
    }
};

const getters = {
    categoryView(state) {
        return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || {};
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}
