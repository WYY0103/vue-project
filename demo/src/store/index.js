import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 引入小仓库 将大仓库拆分成小仓库
import home from "./home";
import search from "./search";


// vuex下面的store方法初始化仓库
export default new Vuex.Store({
    // vuex仓库模块式开发管理仓库
    modules:{
        home,
        search
    }

})