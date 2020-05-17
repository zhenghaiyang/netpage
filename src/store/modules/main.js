import {
    getNewList
} from '@service/Main'

const state = {
    message: "我是来自Vuex的值",
    info: null,
    infoB: null
}

const mutations = {
    mutationsA (state, params) {
        const { rep } = params;
        state.info = rep
    },
    mutationsB (state, params) {
        console.log(",,,mutationsBmutationsB,,,")
        state.infoB = "mutationsB"
    }
}

const actions = {
    actionsA ({ commit }) {
        commit("mutationsA", { rep: "actionA" });
    },
    // 异步请求加上 async await
    async actionsB ({ commit }) {
        const res = await getNewList();
        console.log("actionsBactionsBactionsB", res);
    }
}
export default {
    namespaced: true,//namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，模块下可以调用
    state,
    mutations,
    actions
};