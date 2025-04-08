<template>
  <div class="slide-normal" :class="[this.open ? 'open' : 'close']">
    <div class="drawer-header">
      <div class="header-left">
        <div class="header-back" @click="hide">
          <i class="el-icon-back"></i>
          <span class="back-text">返回</span>
        </div>
        <div class="header-title">{{ title }}</div>
      </div>
      <div class="header-right">
        <capture-icon
          style="width: 32px; height: 32px"
          full-dom="#app-content"
        ></capture-icon>
        <full-icon
          style="margin-right: 8px; width: 32px; height: 32px"
          full-dom="#app-content"
        ></full-icon>
      </div>
    </div>
    <div class="drawer-content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="js">
import fullIcon from "@/components/full-icon";
import captureIcon from "@/components/capture-icon";
export default {
  components: { fullIcon, captureIcon },
  provide() {
    return {
      inContainer: true
    }
  },
  props:{
    title: {
      type: String,
      default: ''
    }
  },
    data(){
        return {
            open: false
        }
    },
    methods: {
        show() {
            this.open = true;
        },
        hide() {
            this.open = false;
        }
    }
}
</script>
<style lang="less" scoped>
.slide-normal {
  position: absolute;
  z-index: 1000;
  background: #fff;
  transition: all 0.3s;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transform: translateX(100%);
  &.open {
    transform: translateX(0px);
  }
}
.scroll-warp {
  height: 100%;
}
.drawer-header {
  height: 48px;
  border-bottom: 1px solid rgba(227, 228, 229, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #344054;
  .header-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .header-back {
    padding: 0 12px;
    border-right: 1px solid rgba(227, 228, 229, 0.3);
    line-height: 48px;
    user-select: none;
    cursor: pointer;
  }
  .el-icon-back {
    font-size: 20px;
  }
  .back-text {
    font-size: 16px;
    margin-left: 8px;
  }
  .header-title {
    font-size: 18px;
    margin-left: 12px;
  }
}
.drawer-content {
  height: calc(100% - 48px);
  overflow: hidden;
  overflow-y: overlay;
  scrollbar-gutter: stable;
  &::-webkit-scrollbar {
    width: 0; /* Chrome/Safari */
    background: transparent;
  }
}
.slide-icon {
  position: absolute;
  cursor: pointer;
  background-size: 100% 100%;
}
.header-right {
  font-size: 0;
}
</style>
