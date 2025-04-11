<template>
  <div class="line-mini" style="height: 80px" ref="line-warp">
    <div
      class="line-mini-item"
      v-for="(lineItem, index) in list"
      :key="'line-item-' + index"
      :style="lineItem"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    lines: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.calculate(this.lines);
  },
  methods: {
    calculate(val) {
      const lineWidth = 6;
      const warpHeight = this.$refs["line-warp"].clientHeight - 6;
      const warpWidth = this.$refs["line-warp"].clientWidth - 6;

      const lineCount = parseInt(warpWidth / lineWidth);
      let listArr = val;
      listArr = listArr.slice(-lineCount);
      listArr = listArr.map((item) => {
        // 时间/开/收/最高/最低/成交量/成交额/震幅/涨跌幅/涨跌额/换手率
        const splitArr = item.split(",");
        return {
          open: parseFloat(splitArr[1]),
          close: parseFloat(splitArr[2]),
          high: parseFloat(splitArr[3]),
          low: parseFloat(splitArr[4]),
          change: parseFloat(splitArr[8]),
        };
      });
      const maxVal = Math.max(...listArr.map((item) => item["high"]));
      const minVal = Math.min(...listArr.map((item) => item["low"]));
      const stepHeight =
        parseInt((warpHeight / (maxVal - minVal)) * 1000) / 1000;

      const tableList = listArr.map((item, index) => {
        let height =
          (Math.max(item.open, item.close) - Math.min(item.open, item.close)) *
          stepHeight;
        height = height > 4 ? height : 4;
        return {
          left: lineWidth * index + "px",
          bottom:
            (Math.min(item.open, item.close) - minVal) * stepHeight + "px",
          width: lineWidth + "px",
          height: height + "px",
          backgroundColor:
            item.close > item.open && item.change > 0
              ? "#F92855"
              : item.close == item.open
              ? "#888888"
              : "#2DC08E",
        };
      });
      this.list = tableList;
    },
  },
  watch: {
    lines(newVal) {
      this.calculate(newVal);
    },
  },
};
</script>
<style lang="less" scoped>
.line-mini {
  position: relative;
  width: 100%;
  clear: both;
  .line-mini-item {
    position: absolute;
    border: 1px solid #fff;
    box-sizing: border-box;
  }
}
</style>
