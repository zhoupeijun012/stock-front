<template>
  <drawer ref="drawer" :title="title">
    <base-detail ref="base-detail">
      <stock-info
        ref="stock-info"
        v-on="$listeners"
        v-bind="$attrs"
      ></stock-info>
    </base-detail>
  </drawer>
</template>

<script>
import drawer from "@/components/drawer";
import BaseDetail from "@/views/components/base-detail.vue";
import StockInfo from "./stock-info.vue";
export default {
  components: {
    drawer,
    BaseDetail,
    StockInfo,
  },
  data() {
    return {
      routerConfig: {},
      loading: false,
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
      this.$refs["drawer"].show();
      this.$nextTick(() => {
        this.$refs["base-detail"].getDetail(row);
        this.$refs["stock-info"].getDetail(row);
      });
    },
  },
};
</script>
