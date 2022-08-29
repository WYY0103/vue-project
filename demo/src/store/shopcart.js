import { reqGetShoppingCart, reqDeleteCart, reqCheckCartChecked } from '@/api'

const state = {
    cartList: [],

};

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};

const actions = {
    // actions里面的函数的第一个参数是context
    // context  就是一个小仓库 里面有state dispatch getters commit等等
    async getCartList({ commit }) {
        let res = await reqGetShoppingCart();
        console.log(res);
        if (res.code == 200) {
            commit('GETCARTLIST', res.data);
        }
    },
    async deleteCartListBySkuId({ commit }, skuId) {
        let res = await reqDeleteCart(skuId);
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('error'));
        }
    },
    async checkCartChecked({ commit }, { skuId, isChecked }) {
        let res = await reqCheckCartChecked(skuId, isChecked);
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('error'));
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll =[];
        getters.cartList.cartInfoList.forEach((item) => {
            let res = item.isChecked == 1 ? dispatch('deleteCartListBySkuId',item.skuId) : '';
            PromiseAll.push(res);
        });
        return Promise.all(PromiseAll);
    }
};

const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}