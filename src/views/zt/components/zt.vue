<template>
    <layout-warp>
      <slot></slot>
      <content-warp v-bind="$attrs" :title="title">
        <stock-cell
          v-for="(ztCell, index) in dataList"
          :showCloumn="['name','lb','prec']"
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
        return `涨停:${this.dataList.length}只`
      }
    },
    methods: {
      refreshDate(list=[]) {
          this.dataList = list;
          console.log(this.dataList);
      },
    },
  
  }
  </script>
  
  <style lang="less" scoped></style>
  