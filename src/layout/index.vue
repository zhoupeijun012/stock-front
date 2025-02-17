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
        <div class="header-left">
          <hamger :is-active="!isCollapse" @toggleClick="toggleSideBar"></hamger>
          <div class="header-title">股票列表</div>
        </div>
      </div>
      <div class="app-content">
        <el-scrollbar class="scroll-warp">
          <div class="scroll-content">
            <router-view></router-view>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import hamger from './hamger.vue';
import { routes } from '@/router/index';
export default {
  name: 'Layout',
  components: {
    hamger
  },
  computed: {
    menuList() {
      return routes
    }
  },
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
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
    }
  }

  .app-content {
    height: calc(100% - 50px);
    position: relative;
  }
}

.scroll-warp {
  height: 100%;

  /deep/.el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.scroll-content {
  min-height: calc(100vh - 50px);
  border: 10px solid #fafafa;
  box-sizing: border-box;
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
