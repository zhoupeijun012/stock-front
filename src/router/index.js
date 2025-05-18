import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
/* Layout */

Vue.use(VueRouter);

export const routes = [
  {
    path: "/stock",
    name: "stock",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/stock/index.vue"),
    meta: { title: "股票列表", icon: "股票" },
  },
  {
    path: "/concept",
    name: "concept",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/concept/index.vue"),
    meta: { title: "概念板块", icon: "概念" },
  },
  {
    path: "/industry",
    name: "industry",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/industry/index.vue"),
    meta: { title: "行业板块", icon: "行业" },
  },
  {
    path: "/region",
    name: "region",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/region/index.vue"),
    meta: { title: "地区板块", icon: "地区" },
  },
  {
    path: "/etf/0",
    name: "T+0",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/etf/t+0.vue"),
    meta: { title: "ETF（ T+0 ）", icon: "T+0" },
  },
  {
    path: "/etf/1",
    name: "T+1",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/etf/t+1.vue"),
    meta: { title: "ETF（ T+1 ）", icon: "T+1" },
  },
  {
    path: "/lof",
    name: "lof",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/lof/index.vue"),
    meta: { title: "LOF", icon: "LOF" },
  },
  {
    path: "/focus",
    name: "focus",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/focus/index.vue"),
    meta: { title: "关注", icon: "关注" },
  },
  {
    path: "/limit",
    name: "limit",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/limit/index.vue"),
    meta: { title: "涨停池", icon: "涨停" },
  },
  {
    path: "/np",
    name: "np",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/np/index.vue"),
    meta: { title: "指数列表", icon: "指数" },
  },
  {
    path: "/overview",
    name: "overview",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/overview/index.vue"),
    meta: { title: "看板", icon: "看板" },
  },
  {
    path: "/k-line",
    name: "k-line",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/k-line/index.vue"),
    meta: { title: "K线列表", icon: "K线" },
  },
  {
    path: "/fund",
    name: "fund",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/fund/index.vue"),
    meta: { title: "资金流", icon: "资金" },
  },
  {
    path: "/task-queue",
    name: "task-queue",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/task-queue/index.vue"),
    meta: { title: "任务列表", icon: "任务" },
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: routes.concat([
    {
      path: "*",
      redirect: "/stock",
    },
  ]),
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
