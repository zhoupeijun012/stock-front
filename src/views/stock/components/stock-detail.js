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
        rootDom.removeChild(instance.$el);
        instance.$destroy();
        instance = null;
      };

      if (instance && instance.show) {
        setTimeout(()=>{
          instance.show(porpsData);
        },0)
      }

      return new Promise((resolve, reject) => {
        instance.$children[0].$watch("open", (val) => {
          if (!val) {
            resolve();
            setTimeout(() => {
              resolve();
              destroyDialog();
            }, 200);
          }
        });
      });
    };

    Vue.prototype.$stockDetail = openDialog;
  },
};
