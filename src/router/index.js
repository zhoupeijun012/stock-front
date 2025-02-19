import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
/* Layout */

Vue.use(VueRouter);

export const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/stock/index.vue"),
    meta: { title: "股票列表", icon: "el-icon-notebook-2" },
  },
  {
    path: "/etf/0",
    name: "T+0",
    component: () => import("@/views/etf/t+0.vue"),
    meta: { title: "ETF（ T+0 ）", icon: "el-icon-notebook-2" },
  },
  {
    path: "/etf/1",
    name: "T+1",
    component: () => import("@/views/etf/t+1.vue"),
    meta: { title: "ETF（ T+1 ）", icon: "el-icon-notebook-2" },
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior:()=>({ x: 0, y: 0 }),
  routes,
});

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start();
  // document.title = to.meta.title;
  next();
});
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

export default router;
