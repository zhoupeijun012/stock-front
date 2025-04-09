<template>
  <el-scrollbar class="scroll-warp">
    <div>
      <el-row
        v-for="(tableItem, index) in tableData"
        :key="'scroll-row-' + index"
        class="scroll-row"
        @click.native="$emit('gotoDetail', tableItem)"
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
        <el-col
          :span="5"
          class="scroll-cell"
          :style="valueStyle(tableItem.f62)"
          title="主力净流入"
          >{{ formatMoney(tableItem.f62) }}</el-col
        >
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
    requestFunction: {
      type: Function,
      default: () => null,
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
        where: {},
        matchKey: ["f14", "f3", "f6", "f62", "f11", "f12"],
        whereNot: {
          f12: ["BK1051", "BK0816", "BK1050"],
        },
      };
      if (this.requestFunction) {
        this.requestFunction(params).then((data) => {
          this.tableData = data?.list || [];
        });
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
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
