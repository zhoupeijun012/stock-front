import Vue from 'vue'
import Vuex from 'vuex'
import zt from './modules/zt';
import zrzt from './modules/zrzt';
Vue.use(Vuex)
export default new Vuex.Store({
  namespaced: true,
  state:{
    fullScreen: false
  },
  mutations: {
    switchFull(state,data) {
      state.fullScreen = data
    }
  },
  modules: {
    zt,
    zrzt
  }
})
