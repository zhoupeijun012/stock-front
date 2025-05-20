<template>
  <div class="column-fold">
    <el-row>
      <el-col
        :span="column.span"
        :lg="column.lg || column.span"
        v-for="(column, index) in colums"
        :key="'column' + index"
      >
        <component
          :is="column.component"
          :row="row"
          :column="column"
        ></component>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CellItem from "./cell-item.vue";
import TextCell from "./text-cell.vue";
import Concepts from './concepts.vue';
export default {
  components: {
    CellItem,
    TextCell,
    Concepts
  },
  props: {
    row: {
      type: Object,
      default: () => {},
    },
    colums: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.column-fold {
  padding-left: 54px;
  box-sizing: border-box;
}
</style>
