import { reqGetCode, reqRegister, reqUserLogin,reqUserInfo } from '@/api'
import {setToken,getToken} from '@/utils/token'

const state = {
    //验证码
    code: '',
    //身份标识符很重要【存储在vuex】
    token:getToken(),
    //用户名
    nickName: ''
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_USERINFO(state, nickName) {
        state.nickName = nickName;
    },
    
};
const actions = {
    // 获取验证码
    // 正常情况下是不需要将验证码放进仓库中  但是由于后台并没有发给用户
    // 所以这块就直接放进仓库中获取一下进行展示即可
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    //注册用户的地方
    async registerUser({ commit }, obj) {
        //注册接口没有返回data,不需要提交mutation
        let result = await reqRegister(obj);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
    ,
    //用户登录
    async userLogin({ commit }, data) {
        /*
          举例子
           {
                 code:200,
                 data:{
                      token:'1e4vdadhajkhdakj6sahdajk'
                 },
                 message:'登录成功'
           }
        */
        let res = await reqUserLogin(data);
        if (res.code == 200) {
            commit('SET_TOKEN', res.data.token);
            setToken(res.data.token);
            //经常登录的成功获取token,持久化存储
            return 'ok';
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let res = await reqUserInfo();
        if (res.code == 200) {
            commit('SET_USERINFO', res.data.nickName);
            return 'ok';
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    
};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}
