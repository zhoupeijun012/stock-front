import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lastUpdate: ''
  },
  mutations: {
    updated(state) {
      state.lastUpdate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }
  }
})
