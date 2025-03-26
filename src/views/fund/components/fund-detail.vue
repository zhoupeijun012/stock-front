<template>
  <drawer ref="drawer" :title="title">
    <div style="width: 100%; height: 100%" ref="chart"></div>
  </drawer>
</template>

<script>
import drawer from "@/components/drawer";
import { getFundOne } from "@/api/index";
import * as echarts from "echarts";
export default {
  components: {
    drawer,
  },
  data() {
    return {
      otherSearchRow: {},
      routerConfig: {},
    };
  },
  computed: {
    title() {
      return this.routerConfig.title || "标题";
    },
  },
  methods: {
    show(row) {
      this.routerConfig = row;
      this.$refs["drawer"].show();
      this.$nextTick(() => {
        this.$refs["ft-table"].doQuery();
      });
    },
    getDetail() {
      getFundOne({
        where: [
          {
            f12: this.routerConfig.f12,
          },
        ],
      }).then((res) => {
        const xData = [];
        const YData = [];

        const f50003 = JSON.parse(res.data.f50003);

        f50003.forEach((item) => {
          const splitArr = item.split(",");
          xData.push(splitArr[0]);

          const sumVal =
            parseFloat(splitArr[2]) +
            parseFloat(splitArr[3]) +
            parseFloat(splitArr[4]);
          YData.push(sumVal);
        });
        debugger;
        this.chart = echarts.init(this.$refs["chart"]);
        this.chart.setOption({
          xAxis: {
            type: "category",
            data: xData,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: YData,
              type: "bar",
              barGap: 10,
              barWidth: 10,
            },
          ],
        });
        // const { f40001 } = res.data || {};
        // let chartData = JSON.parse(f40002);
        // //  时间/开/收/最高/最低/成交量/成交额/震幅/涨跌幅/涨跌额/换手率
        // chartData = chartData.map((item) => {
        //   const splitArr = item.split(",");

        //   return {
        //     timestamp: splitArr[0],
        //     open: parseFloat(splitArr[1]),
        //     close: parseFloat(splitArr[2]),
        //     high: parseFloat(splitArr[3]),
        //     low: parseFloat(splitArr[4]),
        //     volume: parseFloat(splitArr[5]),
        //     turnover: formatMoney(splitArr[6]),
        //   };
        // });
        // this.$refs["k-line-chart"].refreshData(chartData);
      });
    },
    requestFunction(params) {
      return ;
    },
  },
};
</script>

<style lang="less" scoped>
.pagination-block {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
/deep/.drawer-stock {
  .search-bar {
    border-radius: 0 !important;
  }
}
</style>
