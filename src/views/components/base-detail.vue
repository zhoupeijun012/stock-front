<template>
  <drawer ref="drawer" :title="title">
    <div
      style="
        height: 100%;
        width: 100%;
        border: 8px solid #fff;
        box-sizing: border-box;
      "
    >
      <k-line-chart
        ref="k-line-chart"
        style="width: 100%; height: 100%"
      ></k-line-chart>
    </div>
  </drawer>
</template>

<script>
import drawer from "@/components/drawer";
import { getKLineOne } from "@/api/index";
import KLineChart from "@/components/k-line-chart";
import { formatMoney } from "@/utils/tool";
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
            timestamp: splitArr[0],
            open: parseFloat(splitArr[1]),
            close: parseFloat(splitArr[2]),
            high: parseFloat(splitArr[3]),
            low: parseFloat(splitArr[4]),
            volume: parseFloat(splitArr[5]),
            turnover: formatMoney(splitArr[6]),
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
