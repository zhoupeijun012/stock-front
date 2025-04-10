<template>
  <el-scrollbar class="scroll-warp">
    <div>
      <el-row
        v-for="(tableItem, index) in tableData"
        :key="'scroll-row-' + index"
        class="scroll-row"
      >
        <el-col :span="6" class="scroll-cell">{{ tableItem.f14 }}</el-col>
        <el-col
          :span="4"
          class="scroll-cell"
          :style="valueStyle(tableItem.f3)"
          title="涨幅"
          >{{ formatPrec(tableItem.f3, "%") }}</el-col
        >
        <el-col
          :span="5"
          class="scroll-cell"
          style="color: red"
          title="成交额"
          >{{ formatMoney(tableItem.f6) }}</el-col
        >
        <el-col :span="5" class="scroll-cell" title="代码">{{
          tableItem.f12
        }}</el-col>
        <el-col
          :span="4"
          class="scroll-cell"
          :style="valueStyle(tableItem.f11)"
          title="五分钟涨幅"
          >{{ formatPrec(tableItem.f11, "%") }}</el-col
        >
      </el-row>
    </div>
  </el-scrollbar>
</template>
<script>
import { formatMoney, valueStyle, formatPrec,IN_OPEN_TIME } from "@/utils/tool";
export default {
  props: {
    tableFunction: {
      type: Function,
      default: () => null,
    },
    whereParams: {
      type: Object | null,
      default: null,
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getDetail();
    this.timer = setInterval(()=>{
      if(IN_OPEN_TIME()) {
        this.getDetail();
      }
    },60*1000)
  },
  methods: {
    formatMoney,
    valueStyle,
    formatPrec,
    getDetail() {
      const params = {
        pageNum: 1,
        pageSize: 10,
        order: [{ prop: "f3", order: "descending" }],
        where: this.whereParams || {},
        matchKey: ["f14", "f3", "f12", "f6", "f11"],
      };
      if (this.tableFunction) {
        this.tableFunction(params).then((data) => {
          this.tableData = data?.list || [];
        });
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less" scoped>
.scroll-warp {
  height: 100%;
  width: 100%;
  /deep/.el-scrollbar__wrap {
    overflow: hidden;
    overflow-y: overlay;
    scrollbar-gutter: stable;
    &::-webkit-scrollbar {
      width: 0; /* Chrome/Safari */
      background: transparent;
    }
  }
  /deep/.el-scrollbar__bar {
    display: none;
  }
}
.scroll-row {
  font-size: 14px;
  padding: 6px;
  cursor: pointer;
  border-bottom: 1px solid #fafafa;
  user-select: none;
  &:hover {
    background: #ecf5ff;
  }
}
.scroll-cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
