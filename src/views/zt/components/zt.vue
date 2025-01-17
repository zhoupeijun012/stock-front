<template>
  <layout-warp v-slot:default="{ type }">
    <content-warp v-bind="$attrs" :title="title">
      <zt-table ref="zt-table" :type="type"></zt-table>
    </content-warp>
  </layout-warp>
</template>
<script lang="js">
import contentWarp from './content-warp.vue';
import layoutWarp from './layout-warp.vue';
import ztTable from './zt-table.vue';
export default {
  components: { contentWarp,layoutWarp,ztTable },
  data() {
    return {
      count: 0
    }
  },
  computed: {
    title() {
      return `涨停:${this.count}只`
    }
  },
  methods: {
    refreshDate(list=[]) {
        this.count = list.length;
        this.$refs['zt-table'].refreshDate(list);
    },
  },

}
</script>

<style lang="less" scoped></style>
