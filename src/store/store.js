import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        // 页面可视高度
        documentClientHeight: 0,
    },
    mutations: {
        resizeHeight(state,value) {
            state.documentClientHeight = value
        }
    }
})