<template>
  <drawer ref="drawer" :title="title">
    <stock-list :otherSearchRow="otherSearchRow" class="drawer-stock"></stock-list>
  </drawer>
</template>

<script>
import drawer from "@/components/drawer";
import StockList from '@/views/stock/index.vue';
export default {
  components: {
    drawer,
    StockList
  },
  data() {
    return {
      otherSearchRow: {},
      routerConfig: {},
    };
  },
  computed: {
    title() {
      return this.routerConfig.title || "标题";
    },
  },
  methods: {
    show(row) {
      this.routerConfig = row;
      this.$set(this.otherSearchRow,'f102',[row.f14]);
      this.$nextTick(() => {
        this.$refs["drawer"].show();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pagination-block {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
/deep/.drawer-stock {
  .search-bar {
    border-radius: 0 !important;
  }
}
</style>
