<template>
  <div class="text-cell" :style="column.foldStyle || {}">
    <div class="text-left">{{ column.label }}</div>
    <div class="text-right">
      <div class="cell-item" @click="onClick">
        <div class="cell-left">{{ cellItem.f14 }}</div>
        <div class="cell-right" :style="valueStyle(cellItem.f3)">
          {{ formatPrec(cellItem.f3, "%") }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
export default {
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
  computed: {
    cellItem() {
        const key = 'c_' + this.column.prop
        if (this.row[key]) {
        const list = JSON.parse(this.row[key]) || [];
        return list[0];
      } else {
        return {};
      }
    }
  },
  methods: {
    valueStyle,
    formatPrec,
    onClick() {
        this.column.click && this.column.click(this.cellItem);
    }
  },
};
</script>
<style lang="less" scoped>
.text-cell {
  display: flex;
  justify-content: flex-start;
  line-height: 24px;
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
.cell-item {
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  padding: 0 4px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  width: 80%;
  &:hover {
    background: #ecf5ff;
  }
}
</style>