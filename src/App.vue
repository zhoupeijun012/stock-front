<template>
  <div class="zt-table">
    <zt ref="zt-ref"></zt>
    <!-- <Slide direction="left" width="70%" append-to-body>
      <un-zt ref="zrzt-ref"></un-zt>
    </Slide>
    <Slide direction="right" width="70%" append-to-body>
      <zb ref="zb-ref"></zb>
    </Slide> -->
  </div>
</template>
<script lang="js">
import { getZT, getZB, getZRZT } from '@/api/index.js';
import zt from '@/views/zt';
import unZt from '@/views/un-zt';
import zb from '@/views/zb';
export default {
  components: {  zt, unZt, zb },
  data() {
    return {
      zt: [],
      zb: [],
      zrzt: []
    }
  },
  mounted() {
    this.getToday();
    // setInterval(() => {
    //   this.getZT();
    //   this.getZB();
    //   this.$store.commit('updated');
    // }, 3000);
  },
  methods: {
    getToday() {
      this.getZT();
      this.getZRZT();
      this.getZB();
      this.$store.commit('updated');
    },
    getZT() {
      getZT().then((res) => {
        this.zt = res.data.pool || [];
        this.$refs['zt-ref'] && this.$refs['zt-ref'].refreshDate(this.zt);
      })
    },
    getZB() {
      getZB().then((res) => {
        this.zb = res.data.pool || [];
        this.$refs['zb-ref'] && this.$refs['zb-ref'].refreshDate(this.zb);
      })
    },
    getZRZT() {
      getZRZT().then((res) => {
        this.zrzt = res.data.pool || [];
        this.$refs['zrzt-ref'] && this.$refs['zrzt-ref'].refreshDate(this.zrzt);
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
