import { reqCategoryList, reqGetBannerList } from '@/api'

const state = {
    categroyList: [],
    bannerList:[]
};
const mutations = {
    CETEGORYLIST(state, categroyList) {
        state.categroyList = categroyList;
    },
    CETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    }
};
const actions = {
    // actions里面发送请求  提交修改  在mutation里面修改数据
    async categroyList({ commit }) {
        // 通过api里面的接口函数调用，向服务器发送请求，获取服务器数据
        let res = await reqCategoryList();
        if (res.code == 200) {
            commit("CETEGORYLIST", res.data);
        }
    },
    async getBannerList({commit}){
        let res = await reqGetBannerList();
        if(res.code == 200){
            commit("CETBANNERLIST",res.data)
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