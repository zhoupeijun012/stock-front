<template>
    <div class="layout-warp" ref="z-table">
      <div class="layout-table-warp">
        <div class="tool-bar">
          <div class="left">更新时间：{{$store.state.lastUpdate}}</div>
          <div class="right">
            <div
              class="full-icon"
              v-if="!inFull"
              @click="requestFullScreen"
              title="全屏"
            ></div>
            <div class="exit-icon" v-if="inFull" @click="exitFull" title="退出全屏"></div>
          </div>
        </div>
        <div class="bottom-warp">
            <slot></slot>
        </div>
      </div>
    </div>
  </template>
  <script lang="js">
  export default {
    data() {
      return {
        inFull: false,
      }
    },
    methods: {
      requestFullScreen() {
        // 获取要全屏显示的元素
        var element = this.$refs['z-table'];
        this.inFull = true;
        // 请求全屏
        element.requestFullscreen().then(function () {
          console.log("进入全屏模式");
        }).catch(function (error) {
          console.error("无法进入全屏模式:", error);
        });
      },
      //退出全屏 判断浏览器种类
      exitFull() {
        this.inFull = false;
        document.exitFullscreen().then(function () {
          console.log("退出全屏模式");
        }).catch(function (error) {
          console.error("无法退出全屏模式:", error);
        });
      }
    },
  
  }
  </script>
  
  <style lang="less" scoped>
  .layout-warp {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    position: relative;
    overflow: hidden;
    padding: 12px;
    .layout-table-warp {
      box-sizing: border-box;
      position: relative;
      border: 1px solid #e3e4e5;
      padding: 32px 0 12px;
      height: 100%;
    }
  
    .tool-bar {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      position: absolute;
      left: 12px;
      top: 0;
      right: 12px;
      height: 40px;
      line-height: 40px;
    }
  
    .bottom-warp {
      height: 100%;
      box-sizing: border-box;
    }
  
    .table-title {
      padding: 0 5px;
      line-height: 16px;
    }
  
    .table-content {
      height: calc(100% - 16px);
    }
  }
  
  .full-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url("~@/assets/全屏.png");
    background-size: cover;
    margin-top: 10px;
    cursor: pointer;
  }
  
  .exit-icon {
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url("~@/assets/退出全屏.png");
    background-size: cover;
    margin-top: 10px;
    cursor: pointer;
  }
  </style>
  