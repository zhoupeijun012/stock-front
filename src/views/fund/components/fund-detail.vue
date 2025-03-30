<template>
  <drawer ref="drawer" :title="title">
    <div style="width: 100%; height: 150px" ref="chart"></div>
    <div style="border-top: 8px solid #fafafa">
      <ft-table
        :requestFunction="requestFunction"
        :options="options"
        ref="ft-table"
        :show-pager="false"
        :auto-height="false"
      >
      </ft-table>
    </div>
  </drawer>
</template>

<script>
import drawer from "@/components/drawer";
import FtTable from "@/components/ft-table";
import { getFundOne } from "@/api/index";
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
import * as echarts from "echarts";
export default {
  components: {
    drawer,
    FtTable,
  },
  data() {
    return {
      routerConfig: {},
      options: {
        columns: [
          {
            prop: "f221",
            label: "日期",
            minWidth: "80px",
            showOverflowTooltip: true,
          },
          {
            prop: "f2",
            label: "收盘价",
            minWidth: "60px",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
          },
          {
            prop: "f3",
            label: "涨跌幅",
            minWidth: "60px",
            cellStyle: (row) => {
              return valueStyle(row.f3);
            },
            formatter: (row) => {
              return row.f3 + "%";
            },
          },
          {
            prop: "f62",
            label: "主力净流入",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f62);
            },
            formatter: (row) => {
              return formatMoney(row.f62);
            },
          },
          {
            prop: "f66",
            label: "超大单净流入",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f66);
            },
            formatter: (row) => {
              return formatMoney(row.f66);
            },
          },
          {
            prop: "f72",
            label: "大单净流入",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f72);
            },
            formatter: (row) => {
              return formatMoney(row.f72);
            },
          },
          {
            prop: "f78",
            label: "中单净流入",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f78);
            },
            formatter: (row) => {
              return formatMoney(row.f78);
            },
          },
          {
            prop: "f84",
            label: "小单净流入",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f84);
            },
            formatter: (row) => {
              return formatMoney(row.f84);
            },
          },
        ],
      },
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
    // getDetail() {
    //   getFundOne({
    //     where: [
    //       {
    //         f12: this.routerConfig.f12,
    //       },
    //     ],
    //   }).then((res) => {
    //     const xData = [];
    //     const YData = [];

    //     const f50003 = JSON.parse(res.data.f50003);

    //     f50003.forEach((item) => {
    //       const splitArr = item.split(",");
    //       xData.push(splitArr[0]);

    //       const sumVal =
    //         parseFloat(splitArr[2]) +
    //         parseFloat(splitArr[3]) +
    //         parseFloat(splitArr[4]);
    //       YData.push(sumVal);
    //     });
    //     this.chart = echarts.init(this.$refs["chart"]);
    //     this.chart.setOption({
    //       xAxis: {
    //         type: "category",
    //         data: xData,
    //       },
    //       yAxis: {
    //         type: "value",
    //       },
    //       series: [
    //         {
    //           data: YData,
    //           type: "bar",
    //           barGap: 10,
    //           barWidth: 10,
    //         },
    //       ],
    //     });
    //     // const { f40001 } = res.data || {};
    //     // let chartData = JSON.parse(f40002);
    //     // //  时间/开/收/最高/最低/成交量/成交额/震幅/涨跌幅/涨跌额/换手率
    //     // chartData = chartData.map((item) => {
    //     //   const splitArr = item.split(",");

    //     //   return {
    //     //     timestamp: splitArr[0],
    //     //     open: parseFloat(splitArr[1]),
    //     //     close: parseFloat(splitArr[2]),
    //     //     high: parseFloat(splitArr[3]),
    //     //     low: parseFloat(splitArr[4]),
    //     //     volume: parseFloat(splitArr[5]),
    //     //     turnover: formatMoney(splitArr[6]),
    //     //   };
    //     // });
    //     // this.$refs["k-line-chart"].refreshData(chartData);
    //   });
    // },
    requestFunction(params) {
      params.where = [
        {
          f12: this.routerConfig.f12,
        },
      ];
      return new Promise((resolve, reject) => {
        getFundOne(params).then((res) => {
          let { f14, f50003 = "[]" } = res.data || {};
          this.routerConfig.title = f14;
          f50003 = JSON.parse(f50003);
          f50003 = f50003.map((item) => {
            const arr = item.split(",");
            // 日期/主力净流入/小单净流入/中单净流入/大单净流入/超大单净流入/主力流入净占比/小单净占比/中单净占比/大单净占比/超大单净占比/收盘价/涨跌幅
            return {
              f221: arr[0],
              f2: arr[11],
              f3: arr[12],
              f62: arr[1],
              f66: arr[5],
              f72: arr[4],
              f78: arr[3],
              f84: arr[2],
            };
          });
          f50003 = f50003.reverse();
          resolve({
            pageNum: 1,
            pageSize: f50003.length,
            total: f50003.length,
            pages: 1,
            list: f50003,
          });
        });
      });
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
