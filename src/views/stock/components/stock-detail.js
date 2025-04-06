import StockDetail from "./stock-detail.vue";

export default {
  install(Vue) {
    const ComponentStructor = Vue.extend(StockDetail);

    const openDialog = function (porpsData) {
      const dom = document.createElement("div");
      const rootDom = document.querySelector("#router-view-content");
      rootDom.appendChild(dom);

      let instance = new ComponentStructor().$mount(dom);

      const destroyDialog = () => {
        instance.$destroy();
        instance = null;
        dom.parentNode && dom.parentNode.removeChild(dom);
      };

      if (instance && instance.show) {
        instance.show(porpsData);
      }

      return new Promise((resolve, reject) => {
        instance.$children[0].$watch("open", (val) => {
          if (!val) {
            resolve();
            destroyDialog();
          }
        });
      });
    };

    Vue.prototype.$stockDetail = openDialog;
  },
};
