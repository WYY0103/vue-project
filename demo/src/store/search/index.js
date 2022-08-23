import { reqGetSearchInfo } from "@/api";

const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.Searchlist = searchList;
    }
};
const actions = {
    async getSearchList({ commit }, params = {}) {
        // 在调用接口请求数据的时候 至少传递一个参数
        // 当用户派发action的时候，第二个参数传递过来的
        let res = await reqGetSearchInfo(params);
        console.log(res);
        if (res.code == 200) {
            commit("GETSEARCHLIST", res.data);
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