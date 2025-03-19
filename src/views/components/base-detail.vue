<template>
  <drawer ref="drawer" :title="title">
    <k-line-chart
      ref="k-line-chart"
      style="width: 300px; height: 500px"
    ></k-line-chart>
  </drawer>
</template>

<script>
import drawer from "@/components/drawer";
import { getKLineOne } from "@/api/index";
import KLineChart from "@/components/k-line-chart";
import dayjs from 'dayjs';
export default {
  components: {
    drawer,
    KLineChart,
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
        this.getDetail();
      });
    },
    getDetail() {
      getKLineOne({
        where: [
          {
            f12: this.routerConfig.f12,
            f40001: this.routerConfig.f40001,
          },
        ],
      }).then((res) => {
        const { f40001, f40002 = "[]" } = res.data || {};
        let chartData = JSON.parse(f40002);
        //  时间/开/收/最高/最低/成交量/成交额/震幅/涨跌幅/涨跌额/换手率
        chartData = chartData.map((item) => {
          const splitArr = item.split(",");
          return {
            timestamp: dayjs(splitArr[0]).valueOf(),
            open: splitArr[1],
            close: splitArr[2],
            high: splitArr[3],
            low: splitArr[4],
            volume: splitArr[5],
            turnover: splitArr[6],
          };
        });
        this.$refs["k-line-chart"].refreshData(chartData);
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
