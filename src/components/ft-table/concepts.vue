<template>
  <el-scrollbar class="scroll-warp">
    <div
      class="cell-item"
      v-for="(cellItem, index) in list"
      :key="'cell-item-' + index"
      @click="onClick(cellItem)"
    >
      <div class="cell-left">{{ cellItem.f14 }}</div>
      <div class="cell-right" :style="valueStyle(cellItem.f3)">
        {{ formatPrec(cellItem.f3, "%") }}
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
export default {
  name: "concepts",
  components: {},
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
    list() {
      if (this.row.c_f103) {
        const list = JSON.parse(this.row.c_f103) || [];
        list.sort((cur, next) => next.f3 - cur.f3);
        return list;
      } else {
        return [];
      }
    },
  },
  methods: {
    formatMoney,
    valueStyle,
    formatPrec,
    onClick(cellItem) {
      this.column.click && this.column.click(cellItem);
    },
  },
};
</script>

<style lang="less" scoped>
.scroll-warp {
  height: 128px;
  /deep/.is-horizontal {
    display: none;
  }
  /deep/.el-scrollbar__wrap {
    overflow: hidden;
    overflow-y: scroll;
  }
}
.cell-item {
  height: 32px;
  line-height: 32px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background: #fff;
  margin-bottom: 4px;
  padding: 0 12px 0 8px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  &:hover {
    background: #ecf5ff;
  }
}
.cell-left {
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
}
.cell-right {
}
</style>
