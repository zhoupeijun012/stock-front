import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { HappyScroll } from 'vue-happy-scroll'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'
import "@/styles/index.less";
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
