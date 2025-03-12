<template>
  <drawer ref="drawer" :title="title">
    {{ routerConfig }}
  </drawer>
</template>

<script>
import drawer from "@/components/drawer";
export default {
  components: {
    drawer,
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
