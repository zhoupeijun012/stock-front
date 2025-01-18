<template>
  <div class="layout-warp" ref="z-table">
    <div class="layout-table-warp" ref="layout-table-warp">
      <div class="tool-bar">
        <div class="left">更新时间：{{ lastUpdate }}</div>
        <div class="right">
          <slot name="layout-right"></slot>
          <switch-icon open-title="截图" style="margin-left: 10px" :open-icon="require('@/assets/快照.png')"
            close-title="截图" :close-icon="require('@/assets/快照.png')" @open="capture" @close="capture"></switch-icon>
          <switch-icon open-title="全屏" style="margin-left: 10px" :open="fullScreen" :open-icon="require('@/assets/全屏.png')"
            close-title="退出全屏" :close-icon="require('@/assets/退出全屏.png')" @open="requestFullScreen"
            @close="exitFull"></switch-icon>
        </div>
      </div>
      <div class="bottom-warp">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="js">
import switchIcon from './switch-icon.vue';
import html2canvas from 'html2canvas';
import { mapState,mapMutations } from 'vuex';
export default {
  props: {
    lastUpdate: {
      type: String,
      default: ''
    }
  },
  components: { switchIcon },
  computed: {
    ...mapState([
      'fullScreen'
    ])
  },
  methods: {
    ...mapMutations([
      'switchFull'
    ]),
    requestFullScreen() {
      // 获取要全屏显示的元素
      var element = this.$refs['z-table'];
      // 请求全屏
     this.switchFull(true);
      element.requestFullscreen().then(function () {
        console.log("进入全屏模式");
      }).catch(function (error) {
        console.error("无法进入全屏模式:", error);
      });
    },
    //退出全屏 判断浏览器种类
    exitFull() {
      this.switchFull(false);
      document.exitFullscreen().then(function () {
        console.log("退出全屏模式");
      }).catch(function (error) {
        console.error("无法退出全屏模式:", error);
      });
    },
    capture() {
      html2canvas(this.$refs['layout-table-warp']).then((canvas) => {
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

/deep/.happy-scroll-container .happy-scroll-content {
  display: block !important;
}

/deep/ .happy-scroll-container {
  padding-right: 22px !important;
  box-sizing: border-box;
}
</style>
