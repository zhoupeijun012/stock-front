import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "@/directives/index";
Vue.use(ElementUI, { size: "middle", zIndex: 3000 });
import { Scrollbar } from "element-ui";
Vue.use(Scrollbar);
import "element-ui/lib/theme-chalk/index.css";
// 引入css
import "@/styles/index.less";
Vue.config.productionTip = false;

import StockDeatil from "@/views/stock/components/stock-detail.js";
Vue.use(StockDeatil);

import ConceptDeatil from "@/views/concept/components/concept-detail.js";
Vue.use(ConceptDeatil);
import ConceptDrilling from "@/views/concept/components/concept-drilling.js";
Vue.use(ConceptDrilling);

import IndustryDeatil from "@/views/industry/components/industry-detail.js";
Vue.use(IndustryDeatil);
import IndustryDrilling from "@/views/industry/components/industry-drilling.js";
Vue.use(IndustryDrilling);

import RegionDeatil from "@/views/region/components/region-detail.js";
Vue.use(RegionDeatil);
import RegionDrilling from "@/views/region/components/region-drilling.js";
Vue.use(RegionDrilling);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
