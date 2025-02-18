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
    component: () => import("@/views/home/index.vue"),
    meta: { title: "股票列表", icon: "el-icon-notebook-2" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
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
