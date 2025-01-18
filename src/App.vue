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
import zt from '@/views/zt';
import unZt from '@/views/un-zt';
import zb from '@/views/zb';
import { mapActions } from 'vuex';
import * as STORE_TYPES from '@/store/store_types';
export default {
  components: {  zt, unZt, zb },
  data() {
    return {

    }
  },
  mounted() {
    this.getToday().then(()=>{

    })
  },
  methods: {
    ...mapActions('zt',{
      getToday: STORE_TYPES.UPDATE_LIST_TODAY_ACTION
    })
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
