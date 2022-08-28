import {reqGetShoppingCart} from '@/api'

const state = {

};
const mutations = {
    
   
};
const actions = {
    async getCartList({commit}){
        let res = await reqGetShoppingCart();
        console.log(res);
    }
   
};

const getters = {
   
};

export default {
    state,
    mutations,
    actions,
    getters
}