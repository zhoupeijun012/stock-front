<template>
  <div ref="chart" />
</template>
<script>
import { init, dispose, registerLocale, registerIndicator } from "klinecharts";

registerLocale("zh-CN", {
  time: "时间：",
  open: "开：",
  high: "高：",
  low: "低：",
  close: "收：",
  volume: "成交量：",
  turnover: "成交额：",
  change: "涨幅：",
  distance: "距今涨幅：",
});

registerIndicator({
  name: "distance",
  shortName: "",
  visible: true,
  shouldOhlc: false,
  isStack: true,
  calc: (kLineDataList) => {
    let lastVal = 0;
    const result = [];
    kLineDataList.forEach((item, index) => {
      if (index == 0) {
        lastVal = item["close"];
      }
      result.push({
        distance: parseInt(((item["close"] - lastVal) / lastVal) * 10000) / 100,
      });
    });
    return result;
  },
  createTooltipDataSource: ({ crosshair: { kLineData } }) => {
    return {
      legends: [
        {
          title: "距今涨幅: ",
          value: {
            text: kLineData.distance + "%",
            color:
              kLineData.distance > 0
                ? "#f00"
                : kLineData.distance == 0
                ? "#888888"
                : "#2DC08E",
          },
        },
      ],
    };
  },
});

import { formatMoney } from "@/utils/tool";
export default {
  data() {
    this.chart = null;
    return {};
  },
  computed: {
    chartConfig() {
      return {
        locale: "zh-CN",
        zoom: {
          // 初始缩放比例设置为 0.8
          defaultScale: 0.5,
          step: 0.1, // 每次缩放的步长，可根据需要调整
          enabled: true, // 是否启用缩放功能
          minScale: 0.2, // 最小缩放比例
          maxScale: 2.0, // 最大缩放比例
        },
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
          // {
          //   type: "indicator",
          //   content: ["MACD"],
          //   options: {
          //     order: 10,
          //   },
          // },
        ],
        customApi: {
          formatDate(timestamp, _, type) {
            return timestamp;
          },
          formatBigNumber: formatMoney,
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
              showType: "rect", // 'standard' | 'rect'
              values: null,
              defaultValue: "-",
              custom: [
                { title: "time", value: "{time}" },
                { title: "open", value: "{open}" },
                { title: "high", value: "{high}" },
                { title: "low", value: "{low}" },
                { title: "close", value: "{close}" },
                { title: "turnover", value: "{turnover}" },
                { title: "change", value: "{change}" },
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
                show: true,
                upColor: "#f00",
                downColor: "#2DC08E",
                noChangeColor: "#888888",
                textMargin: 5,
                size: 14,
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
              showRule: "always",
              // rect是指顶部文案垂直排列
              showType: "rect", // 'standard' | 'rect'
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
    chart.setOffsetRightDistance(28);
    chart.createIndicator("distance", false, { id: "candle_pane" });
    this.chart = chart;
  },
  methods: {
    refresh(data) {
      let lastVal = data[data.length - 1].close;
      data = data.map((item, index) => {
        return {
          distance: Math.ceil((lastVal -item.close ) / item.close * 10000) / 100,
          ...item,
        };
      });
      this.chart.applyNewData(data);
    },
    reDraw() {
      setTimeout(() => {
        this.chart && this.chart.resize();
      }, 300);
    },
  },
  beforeDestroy() {
    dispose(this.chart);
  },
  watch: {
    "$store.state.fullScreen": {
      handler(newVal) {
        this.reDraw();
      },
    },
  },
};
</script>
