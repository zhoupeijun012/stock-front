import Vue from "vue";
Vue.directive("height-change", {
  inserted(el, binding) {
    const MutationObserver =
      window.MutationObserver ||
      window.webkitMutationObserver ||
      window.MozMutationObserver;
    let recordHeight = 0;
    const onHeightChange = _.throttle(function () {
      // _.throttle 节流函数
      let height = window.getComputedStyle(el).getPropertyValue("height");
      if (height === recordHeight) {
        return;
      }
      recordHeight = height;
      binding.value(recordHeight);
      // 之后更新外部容器等操作
    }, 10);

    el.__onHeightChange__ = onHeightChange;

    el.addEventListener("animationend", onHeightChange);

    el.addEventListener("transitionend", onHeightChange);

    el.__observer__ = new MutationObserver((mutations) => {
      onHeightChange();
    });

    el.__observer__.observe(el, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });
  },
  unbind(el) {
    if (el.__observer__) {
      el.__observer__.disconnect();
      el.__observer__ = null;
    }
    el.removeEventListener("animationend", el.__onHeightChange__);
    el.removeEventListener("transitionend", el.__onHeightChange__);
    el.__onHeightChange__ = null;
  },
});
