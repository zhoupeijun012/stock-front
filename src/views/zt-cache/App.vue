<template>
  <div class="root" id="root">
    <swiper :list="list" :default="1"></swiper>
  </div>
</template>
<script lang="js">
import swiper from '@/components/swiper';
export default {
  components: { swiper },
  data() {
    return {
      list: [
        {
          title: '昨日涨停',
          component: ()=>import('@/views/un-zt')
        },
        {
          title: '今日涨停',
          component: ()=>import('@/views/zt')
        },
        {
          title: '今日炸板',
          component: ()=>import('@/views/zb')
        }
      ]
    }
  },
}
</script>

<style lang="less" scoped>
.root {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: #fff;
  position: relative;
  overflow: hidden;
}
</style>
