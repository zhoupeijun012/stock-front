<template>
  <drawer ref="drawer" :title="title">
    <base-detail ref="base-detail"></base-detail>
  </drawer>
</template>

<script>
import drawer from "@/components/drawer";
import BaseDetail from '@/views/components/base-detail.vue';
export default {
  components: {
    drawer,
    BaseDetail
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
        this.$refs['base-detail'].getDetail(row);
      });
    },
  },
};
</script>
