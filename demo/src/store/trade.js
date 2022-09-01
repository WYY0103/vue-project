import { reqAddressInfo, reqShopInfo, reqSubmitOrder } from "@/api";
const state = {
    address: [],
    tradeInfo: {},
    payId:''
};
const mutations = {
    GETADDRESS(state, address) {
        state.address = address;
    },
    GETSHOPINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo;
    },
    SUBMITINFO(state,payId){
        state.payId = payId;
    }
};
const actions = {
    //获取用户信息地址
    async getAddress({ commit }) {
        let res = await reqAddressInfo();
        if (res.code == 200) {
            commit('GETADDRESS', res.data);
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    //获取商品清单
    async getShopInfo({ commit }) {
        let res = await reqShopInfo();
        if (res.code == 200) {
            commit('GETSHOPINFO', res.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    //提交订单:tradeNO 交易编码   data:付款人信息
    async submitInfo({ commit }, { tradeNo, data }) {
        //提交订单的时候：返回一个很重要数据->订单ID【这笔交易唯一标识符:付款人、收款人】
        let res = await reqSubmitOrder(tradeNo, data);
        if (res.code == 200) {
            commit('SUBMITINFO', res.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(res.message));
        }
    }

};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}