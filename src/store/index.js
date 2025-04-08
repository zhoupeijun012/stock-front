import Vue from 'vue'
import Vuex from 'vuex'
import * as StoreTypes from './store_types';
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    fullScreen: false
  },
  mutations: {
    [StoreTypes.UPDATE_FULL_SCREEN](state,poly) {
      state.fullScreen = poly
    }
  }
})
