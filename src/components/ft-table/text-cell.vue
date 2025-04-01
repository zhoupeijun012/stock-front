<template>
  <div class="text-cell">
    <div class="text-left">{{ column.label }}</div>
    <div
      class="text-right"
      :style="column.cellStyle ? column.cellStyle(row) : {}"
    >
      {{ column.formatter ? column.formatter(row) : row[column.prop] }}
    </div>
  </div>
</template>
<script>
export default {
  name: "text-cell",
  props: {
    column: {
      type: Object,
      default: () => {},
    },
    row: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="less" scoped>
.text-cell {
  display: flex;
  justify-content: flex-start;
  line-height: 26px;
  font-size: 14px;
  color: #606266;
}
.text-left {
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: right;
  padding-right: 10px;
  &::after {
    content: ":";
  }
}

.text-right {
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
