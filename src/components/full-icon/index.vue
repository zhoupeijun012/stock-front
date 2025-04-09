<template>
  <switch-icon
    open-title="全屏"
    :open="fullScreen"
    :open-icon="require('@/assets/全屏.png')"
    close-title="退出全屏"
    :close-icon="require('@/assets/全屏.png')"
    @open="requestFullScreen"
    @close="exitFull"
  ></switch-icon>
</template>
<script>
import switchIcon from "@/components/switch-icon";
import * as StoreTypes from "@/store/store_types";
import store from '@/store/index';
export default {
  components: { switchIcon },
  props: {
    fullDom: String,
  },
  data() {
    return {};
  },
  computed: {
    fullScreen() {
      return store.state.fullScreen;
    },
  },
  methods: {
    requestFullScreen() {
      store.commit(StoreTypes.UPDATE_FULL_SCREEN, true);
      // 获取要全屏显示的元素
      var element = document.body;
      // 请求全屏
      element
        .requestFullscreen()
        .then(function () {
          console.log("进入全屏模式");
        })
        .catch(function (error) {
          console.error("无法进入全屏模式:", error);
        });
    },
    //退出全屏 判断浏览器种类
    exitFull() {
      store.commit(StoreTypes.UPDATE_FULL_SCREEN, false);
      document
        .exitFullscreen()
        .then(function () {
          console.log("退出全屏模式");
        })
        .catch(function (error) {
          console.error("无法退出全屏模式:", error);
        });
    },
  },
};
</script>
