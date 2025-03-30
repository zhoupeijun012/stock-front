<template>
  <div style="width: 100%; height: 100%" ref="chart"></div>
</template>
<script>
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
import * as echarts from "echarts/core";
// 引入柱状图图表
import { BarChart } from "echarts/charts";

// 引入提示框、标题和工具箱组件
import {
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent,
} from "echarts/components";

// 引入 Canvas 渲染器
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件和图表
echarts.use([
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  BarChart,
  CanvasRenderer,
  GridComponent,
  DataZoomComponent,
]);

export default {
  data() {
    return {};
  },
  methods: {
    refresh(tableData) {
      this.chart = echarts.init(this.$refs["chart"]);
      const xData = tableData.map((item) => item.f221);
      const jData = tableData.map((item) => item.f62);
      const cdData = tableData.map((item) => item.f66);
      const dData = tableData.map((item) => item.f72);
      const zData = tableData.map((item) => item.f78);
      const sumArray = [];
      let prevSum = 0;
      xData.forEach((item, index) => {
        prevSum += parseFloat(cdData[index]) ;
        sumArray.push(prevSum);
      });
      this.chart.setOption(
        this.getOptions({
          xData,
          YData: jData,
        })
      );
    },
    getOptions({ xData, YData }) {
      return {
        grid: {
          top: 10,
          left: 20,
          right: 20,
          bottom: 10,
          containLabel: true,
        },
        tooltip: {
          // 触发类型为 item，表示鼠标悬停在单个数据项上时触发
          trigger: "item",
          // 格式化 tooltip 的显示内容
          formatter: function (params) {
            return `日期: ${params.name}<br/>金额: ${formatMoney(
              params.value
            )}`;
          },
          z: 1000,
          appendToBody: true,
        },
        xAxis: {
          type: "category",
          data: xData,
          show: false,
          position: "zero",
        },
        yAxis: {
          type: "value",
          show: false,
          position: "zero",
        },
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: 0,
            throttle: 50,
          },
        ],
        series: [
          {
            data: YData,
            type: "bar",
            barGap: 1,
            barWidth: 8,
            itemStyle: {
              color: function (params) {
                // 根据数据值判断颜色
                return params.value >= 0 ? "red" : "green";
              },
            },
          },
        ],
      };
    },
  },
};
</script>
