<template>
  <div ref="chart" />
</template>
<script>
import { init, dispose } from "klinecharts";
export default {
  data() {
    this.chart = null;
    return {
      lineType: "day",
    };
  },
  computed: {
    chartConfig() {
      return {
        locale: "zh-CN",
        layout: [
          {
            type: "candle",
            content: ["MA"],
            options: { order: Number.MIN_SAFE_INTEGER },
          },
          {
            type: "indicator",
            content: ["VOL"],
            options: {
              order: 8,
            },
          },
          { type: "xAxis", options: { order: 9 } },
          {
            type: "indicator",
            content: ["MACD"],
            options: {
              order: 10,
            },
          },
        ],
        customApi: {
          formatDate(timestamp, _, type) {
            return timestamp;
          },
          formatBigNumber: (value) => {
            return value > 100000000 || value < -100000000
              ? parseInt((value / 100000000) * 100) / 100 + "亿"
              : parseInt((value / 10000) * 100) / 100 + "万";
          },
        },
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
              compareRule: "current_open",
              upColor: "#F92855",
              downColor: "#2DC08E",
              noChangeColor: "#888888",
              upBorderColor: "#F92855",
              downBorderColor: "#2DC08E",
              noChangeBorderColor: "#888888",
              upWickColor: "#F92855",
              downWickColor: "#2DC08E",
              noChangeWickColor: "#888888",
            },
            tooltip: {
              // follow_cross是指图表失焦时不展示顶部文案
              showRule: "always", // 'always' | 'follow_cross' | 'none'
              // rect是指顶部文案垂直排列
              showType: "standard", // 'standard' | 'rect'
              labels: ["时间", "开", "收", "高", "低", "成交量"],
              values: null,
              defaultValue: "-",
              custom: [
                { title: "time", value: "{time}" },
                { title: "open", value: "{open}" },
                { title: "high", value: "{high}" },
                { title: "low", value: "{low}" },
                { title: "close", value: "{close}" },
                { title: "volume", value: "{volume}手" },
                { title: "turnover", value: "{turnover}" },
              ],
              text: {
                size: 14,
                marginLeft: 8,
                marginTop: 4,
                marginRight: 8,
                marginBottom: 4,
              },
            },
            priceMark: {
              high: {
                show: true,
                color: "#f00",
                textMargin: 5,
                textSize: 14,
              },
              low: {
                show: true,
                color: "#2DC08E",
                textMargin: 5,
                textSize: 14,
              },
              last: {
                text: {
                  show: true,
                  textMargin: 5,
                  size: 14,
                },
              },
            },
          },
          yAxis: {
            tickText: {
              show: true,
              weight: "normal",
              size: 14,
              marginStart: 4,
              marginEnd: 4,
            },
          },
          xAxis: {
            tickText: {
              show: true,
              weight: "normal",
              size: 14,
              marginStart: 4,
              marginEnd: 4,
            },
          },
          indicator: {
            tooltip: {
              defaultValue: "-",
              text: {
                size: 14,
              },
            },
            bars: [
              {
                style: "fill",
                // 'solid' | 'dashed'
                borderStyle: "solid",
                borderSize: 1,
                borderDashedValue: [2, 2],
                upColor: "#F92855",
                downColor: "#2DC08E",
                noChangeColor: "#888888",
              },
            ],
          },
        },
      };
    },
  },
  mounted() {
    const chart = init(this.$refs.chart, this.chartConfig);
    this.chart = chart;
  },
  methods: {
    refreshData(data, type) {
      this.lineType = type;
      this.chart.applyNewData(data);
    },
  },
  beforeDestroy() {
    dispose(this.chart);
  },
};
</script>
