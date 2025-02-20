import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  ElementUI from 'element-ui';
import "@/directives/index";
Vue.use(ElementUI, { size: 'middle', zIndex: 3000 });
import { Scrollbar } from 'element-ui';
Vue.use(Scrollbar);
import "element-ui/lib/theme-chalk/index.css";
// 引入css
import "@/styles/index.less";
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
