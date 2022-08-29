import { reqGetShoppingCart,reqDeleteCart,reqCheckCartChecked } from '@/api'

const state = {
    cartList: [],

};

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};

const actions = {
    async getCartList({ commit }) {
        let res = await reqGetShoppingCart();
        console.log(res);
        if (res.code == 200) {
            commit('GETCARTLIST', res.data);
        }
    },
    async deleteCartListBySkuId({commit},skuId){
        let res = await reqDeleteCart(skuId);
        if(res.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('error'));
        }
    },
    async checkCartChecked({commit},{skuId,isChecked}){
        let res = await reqCheckCartChecked(skuId,isChecked);
        if(res.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('error'));
        }
    }
};

const getters = {
    cartList(state){
        return state.cartList[0] || {};
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}