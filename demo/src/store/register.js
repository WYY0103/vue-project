import {reqGetCode,reqUserRegister} from '@/api'

const state = {
    code:''
   
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    }
};
const actions = {
    // 获取验证码
    // 正常情况下是不需要将验证码放进仓库中  但是由于后台并没有发给用户
    // 所以这块就直接放进仓库中获取一下进行展示即可
    async getCode({commit},phone){
        let res = await reqGetCode(phone);
        if(res.code){
            commit('GETCODE',res.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('error'));
        }
    },
    // 注册
    userRegister({commit},user){
        let res = reqUserRegister(user);
        if(res.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error(res.message));
        }
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
