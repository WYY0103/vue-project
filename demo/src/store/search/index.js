import { reqGetSearchInfo } from "@/api";

const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
       state.searchList = searchList;
    }
};
const actions = {
    async getSearchList({ commit }, params = {}) {
        // 在调用接口请求数据的时候 至少传递一个参数
        // 当用户派发action的时候，第二个参数传递过来的
        let res = await reqGetSearchInfo(params);
        if (res.code == 200) {
            commit("GETSEARCHLIST", res.data);
        }
    }
};
// 用于计算属性
// 项目中主要作用：简化仓库中的数据
// 因为search中的数据包括好几个模块
// 若用mapState获取的话需要分批获取
// 放进getter中可以简化操作
const getters = {
    // state 当前仓库中的state
    goodsList(state){
        return state.searchList.goodsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}