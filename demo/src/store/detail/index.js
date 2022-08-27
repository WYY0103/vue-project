import { reqGetGoods } from '@/api'

const state = {
    goodsInfo: {}

};
const mutations = {
    
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }

};
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        let res = await reqGetGoods(skuId);
        console.log("2");
        if (res.code == 200) {
            commit("GETGOODSINFO", res.data);
        }
    }
};

const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView || {};
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {};
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}
