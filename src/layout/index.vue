<template>
  <div class="app-wrapper" :class="{ 'app-collapse': isCollapse }">
    <div class="app-left">
      <el-scrollbar class="scroll-warp">
        <el-menu default-active="0" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item :index="index + ''" v-for="(menuItem, index) in menuList" :key="`menu-item-` + index">
            <i :class="menuItem.meta && menuItem.meta.icon"></i>
            <span slot="title">{{ menuItem.meta && menuItem.meta.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="app-right">
      <div class="app-header">
        <div class="header-left" >
          <hamger :is-active="!isCollapse" @toggleClick="toggleSideBar"></hamger>
          <div class="header-title" @click="toggleSideBar">列表</div>
        </div>
        <div class="header-right">
          <switch-icon open-title="截图" style="margin-left: 10px" :open-icon="require('@/assets/快照.png')"
            close-title="截图" :close-icon="require('@/assets/快照.png')" @open="capture" @close="capture"></switch-icon>
          <switch-icon open-title="全屏" style="margin-left: 10px" :open="fullScreen" :open-icon="require('@/assets/全屏.png')"
            close-title="退出全屏" :close-icon="require('@/assets/退出全屏.png')" @open="requestFullScreen"
            @close="exitFull"></switch-icon>
        </div>
      </div>
      <div class="app-content" ref="root">
          <div class="scroll-content" >
            <router-view></router-view>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import hamger from './hamger.vue';
import { routes } from '@/router/index';
import switchIcon from '@/components/switch-icon';
import html2canvas from 'html2canvas';
export default {
  name: 'Layout',
  components: {
    hamger,
    switchIcon,
    html2canvas
  },
  computed: {
    menuList() {
      return routes
    }
  },
  data() {
    return {
      isCollapse: true,
      fullScreen: false
    }
  },
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    requestFullScreen() {
      // this.fullScreen = true;
      // 获取要全屏显示的元素
      var element = this.$refs['root'];
      // 请求全屏
      element.requestFullscreen().then(function () {
        console.log("进入全屏模式");
      }).catch(function (error) {
        console.error("无法进入全屏模式:", error);
      });
    },
    //退出全屏 判断浏览器种类
    exitFull() {
      // this.fullScreen = false;
      document.exitFullscreen().then(function () {
        console.log("退出全屏模式");
      }).catch(function (error) {
        console.error("无法退出全屏模式:", error);
      });
    },
    capture() {
      html2canvas(this.$refs['root']).then((canvas) => {
        canvas.toBlob((blob) => {
          const imgUrl = URL.createObjectURL(blob)
          const a = document.createElement('a');
          a.href = imgUrl;
          a.download = '快照.png';
          a.click();
          window.URL.revokeObjectURL(imgUrl);
        }, 'image/png');
      });

    }
  }
}
</script>

<style lang="less" scoped>
.app-wrapper {
  height: 100vh;
  width: 100vw;
  position: relative;

  .app-left {
    width: 200px;
    height: 100%;
    border-right: 1px solid #e3e4e5;
    float: left;
    background: rgb(48, 65, 86);
    transition: all .4s;

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
    transition: all .4s;
  }

  .app-header {
    height: 50px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
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
    height: calc(100% - 50px);
    position: relative;
    padding: 10px;
    background: #fafafa;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: scroll;
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
  min-height: 100%;
}

.el-menu-vertical-demo {
  border: none;
}

.app-collapse {
  .app-left {
    width: 54px;
  }

  .app-right {
    margin-left: 54px;
  }
}
</style>
