import Vue from 'vue'
import Vuex from 'vuex'
import zt from './modules/zt';
import zrzt from './modules/zrzt';
import * as STORE_TYPES from './store_types';
Vue.prototype.$STORE_TYPES = STORE_TYPES;
Vue.use(Vuex)
export default new Vuex.Store({
  namespaced: true,
  modules: {
    zt,
    zrzt
  }
})
