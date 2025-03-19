<template>
  <div ref="chart" />
</template>
<script>
import { init, dispose } from "klinecharts";
export default {
  data() {
    this.chart = null;
    this.chartConfig = {
      styles: {
        grid: {
          show: true,
          horizontal: {
            show: true,
          },
          vertical: {
            show: false,
          },
        },

        candle: {
          bar: {
            upColor: "#26A69A",
            downColor: "#EF5350",
            noChangeColor: "#888888",
          },
          tooltip: {
            // follow_cross是指图表失焦时不展示顶部文案
            showRule: "always", // 'always' | 'follow_cross' | 'none'
            // rect是指顶部文案垂直排列
            showType: "standard", // 'standard' | 'rect'
            labels: ["时间", "开", "收", "高", "低", "成交量"],
            values: null,
            defaultValue: "n/a",
          },
        },
      },
    };
    return {};
  },
  mounted() {
    this.chart = init(this.$refs.chart, this.chartConfig);
  },
  methods: {
    refreshData(data) {
      this.chart.applyNewData(data);
    },
  },
  beforeDestroy() {
    dispose(this.chart);
  },
};
</script>
