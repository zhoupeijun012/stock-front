<template>
  <layout-warp>
    <content-warp v-bind="$attrs" :title="title">
      <stock-cell
        v-for="(ztCell, index) in dataList"
        :showCloumn="['name', 'prec']"
        :data="ztCell"
        :key="ztCell.c"
      ></stock-cell>
    </content-warp>
  </layout-warp>
</template>
<script lang="js">
import contentWarp from './content-warp.vue';
import layoutWarp from './layout-warp.vue';
import stockCell from './stock-cell';
export default {
  components: { stockCell,contentWarp,layoutWarp },
  data() {
    return {
        dataList: []
    }
  },
  computed: {
    title() {
      return `炸板:${this.dataList.length}只`
    }
  },
  methods: {
    refreshDate(list=[]) {
        this.dataList = list;
    },
  },

}
</script>

<style lang="less" scoped></style>
