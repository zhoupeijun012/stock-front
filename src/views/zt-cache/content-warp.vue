<template>
  <div class="content-warp">
    <div class="content-bottom-warp">
      <div class="table-title">{{ title }}</div>
      <div class="table-content">
        <happy-scroll
          color="#e3e4e5"
          size="5"
          resize
          ref="happy-scroll"
          hide-horizontal
        >
          <div class="scroll-warp">
            <slot></slot>
            <div style="height: 20px; clear: both"></div>
          </div>
        </happy-scroll>
      </div>
    </div>
  </div>
</template>
<script lang="js">
export default {
    props: {
        title: {
            type:String,
            default: '标题'
        }
    },
    mounted() {
        window.addEventListener('resize',this.refreshBar);
    },
    methods: {
        refreshBar() {
            setTimeout(() => {
                this.$refs['happy-scroll'].setContainerSize();
                this.$refs['happy-scroll'].computeStripY();
            }, 200);
        },
    },
    beforeDestroy() {
        window.removeEventListener('resize',this.refreshBar);
    },
}
</script>

<style lang="less" scoped>
.content-warp {
  width: 100%;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;
  background: #fff;
  position: relative;
  overflow: hidden;
  .content-bottom-warp{
    box-sizing: border-box;
    position: relative;
    border: 1px solid #e3e4e5;
    height: 100%;
    padding: 12px;
  }
  .scroll-warp {
    width: 100%;
  }
}
.table-title {
  //   padding: 0 5px;
  line-height: 16px;
  margin-bottom: 8px;
}
.table-content {
  height: calc(100% - 24px);
//   border: 1px solid #e3e4e5;
}
</style>
