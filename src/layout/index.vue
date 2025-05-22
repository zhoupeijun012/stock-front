<template>
  <div
    class="app-wrapper"
    :class="{ 'app-collapse': isCollapse, 'full-screen': fullScreen }"
  >
    <div class="app-left">
      <!-- <el-scrollbar class="scroll-warp"> -->
      <el-menu
        :default-active="defaultActive"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        router
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <el-menu-item v-if="showFullScreenBtn">
          <div class="full-screen-icon" style="background: #fff">
            <full-icon style="width: 40px; height: 40px"></full-icon>
          </div>
        </el-menu-item>
        <el-menu-item
          :index="index + ''"
          v-for="(menuItem, index) in menuList"
          :key="`menu-item-` + index"
          :route="menuItem"
        >
          <i style="font-style: normal">{{
            menuItem.meta && menuItem.meta.icon
          }}</i>
        </el-menu-item>
      </el-menu>
      <!-- </el-scrollbar> -->
    </div>
    <div class="app-right">
      <!-- <div class="app-header">
        <div class="header-left">
          <hamger
            :is-active="!isCollapse"
            @toggleClick="toggleSideBar"
          ></hamger>
          <div class="header-title" @click="toggleSideBar">{{ title }}</div>
        </div>
        <div class="header-right"></div>
      </div> -->
      <div class="app-content" ref="root" id="app-content">
        <div class="scroll-content">
          <router-view id="router-view-content"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hamger from "./hamger.vue";
import fullIcon from "@/components/full-icon";
import { routes } from "@/router/index";
import { detectPwaMode } from "@/utils/tool.js";
export default {
  name: "Layout",
  components: {
    hamger,
    fullIcon,
  },
  computed: {
    menuList() {
      return routes;
    },
    defaultActive() {
      return routes.findIndex((item) => item.path == this.$route.path) + "";
    },
    title() {
      return this.$route.meta && this.$route.meta.title;
    },
    fullScreen() {
      return this.$store.state.fullScreen;
    },
  },
  data() {
    return {
      isCollapse: true,
      showFullScreenBtn: false,
    };
  },
  mounted() {
    this.showFullScreenBtn = !detectPwaMode();
    if (this.showFullScreenBtn) {
      navigator
        .getInstalledRelatedApps()
        .then((relatedApps) => {
          if (relatedApps.length > 0) {
            console.log("PWA已安装到主屏幕");
          } else {
            // console.log('PWA未安装到主屏幕');
            setTimeout(() => {
              if (window.pwaInstaller) {
                this.$confirm("是否安装至桌面以提升体验?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                })
                  .then(() => {
                    // 显示安装提示
                    window.pwaInstaller.prompt();
                    window.pwaInstaller = null;
                    // 清空事件，避免重复使用
                  })
                  .catch(() => {
                    window.pwaInstaller = null;
                  });
              }
            }, 500);
          }
        })
        .catch((error) => {
          console.log("检测失败:", error);
        });
    }
  },
  methods: {
    toggleSideBar() {
      return "";
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.app-wrapper {
  height: 100vh;
  width: 100%;
  position: relative;

  .app-left {
    width: 200px;
    height: 100%;
    border-right: 1px solid #e3e4e5;
    float: left;
    background: rgb(48, 65, 86);
    transition: all 0.2s;

    /deep/.el-submenu__title {
      background: rgb(48, 65, 86);
      color: rgb(191, 203, 217);
    }

    /deep/.el-menu-item {
      background: rgb(48, 65, 86);
      color: rgb(191, 203, 217);
    }
  }

  .app-right {
    margin-left: 200px;
    height: 100%;
    transition: all 0.2s;
  }

  .app-header {
    height: 50px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  .header-left {
    display: flex;
    justify-content: flex-start;

    .header-title {
      color: #000;
      line-height: 50px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    padding-right: 10px;
  }

  .app-content {
    height: 100%;
    position: relative;
    padding: 10px;
    background: #fafafa;
    box-sizing: border-box;
    overflow: hidden;

    // overflow-y: scroll;
  }
}

.scroll-warp {
  height: 100%;
  /deep/.el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.scroll-content {
  box-sizing: border-box;
  background: #fff;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.el-menu-vertical-demo {
  border: none;
  /deep/.el-menu-item {
    padding: 0 !important;
    text-align: center;
  }
  /deep/.el-tooltip {
    padding-left: 12px !important;
    text-align: center;
  }
  /deep/.el-menu-item.is-active {
    background: #fafafa;
  }
}

.app-collapse {
  .app-left {
    width: 54px;
    overflow: hidden;
  }

  .app-right {
    margin-left: 54px;
  }
}

.full-screen {
  .app-left {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    transform: translateX(-90%);
    transition: all 0.4s;
    &:hover {
      transform: translateX(0);
    }
  }
  .app-right {
    margin-left: 0;
  }
  .app-header {
    display: none;
  }
  .app-content {
    height: 100%;
  }
}
</style>
