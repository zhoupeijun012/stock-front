<template>
  <div class="zt-table">
    <zt ref="zt-ref">
      <Slide direction="left" width="70%" append-to-body>
        <un-zt ref="zrzt-ref"></un-zt>
      </Slide>
      <Slide direction="right" width="70%" append-to-body>
        <zb ref="zb-ref"></zb> </Slide
    ></zt>
  </div>
</template>
<script lang="js">
import { getZT, getZB,getZRZT } from '@/api/index.js';
import contentWarp from '@/views/zt/components/content-warp.vue';
import layoutWarp from '@/views/zt/components/layout-warp.vue';
import Slide from '@/views/zt/components/slide';
import zt from '@/views/zt/components/zt';
import unZt from '@/views/zt/components/un-zt';
import zb from '@/views/zt/components/zb';
import stockCell from '@/views/zt/components/stock-cell';
export default {
  components: { Slide,zt,unZt,zb,contentWarp,layoutWarp,stockCell },
  data() {
    return {
      zt:[],
      zb: [],
      zrzt: []
    }
  },
  mounted() {
    this.getToday();
    setInterval(() => {
      this.getZT();
      this.getZB();
      this.$store.commit('updated');
    }, 3000);
  },
  methods: {
    getToday() {
      this.getZB();
      this.getZRZT();
      this.getZB();
      this.$store.commit('updated');
    },
    getZT() {
      getZT().then((res) => {
        this.zt = res.data.pool || [];
        this.$refs['zt-ref'].refreshDate(this.zt);
      })
    },
    getZB() {
      getZB().then((res) => {
        this.zb = res.data.pool || [];
        this.$refs['zb-ref'].refreshDate(this.zb);
      })
    },
    getZRZT() {
      getZRZT().then((res)=>{
        this.zrzt = res.data.pool || [];
        this.$refs['zrzt-ref'].refreshDate(this.zrzt);
      })
    }
  },

}
</script>

<style lang="less" scoped>
.zt-table {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: #fff;
  position: relative;
  overflow: hidden;
  .gt-warp {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .left-warp,
  .mid-warp,
  .right-warp {
    flex: 1;
    max-width: 33.33%;
  }
}
</style>
