<template>
  <drawer ref="drawer" :title="title" v-loading="loading">
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
        style="width: 100%; height: 500px; min-height: 330px"
      ></k-line-chart>
    </div>
  </drawer>
</template>

<script>
import drawer from "@/components/drawer";
import KLineChart from "./k-line-chart.vue";
import { getKLineOne, getFundOne } from "@/api/index";
import { formatMoney, valueStyle, formatPrec,stockKMap } from "@/utils/tool";
export default {
  components: {
    drawer,
    KLineChart,
  },
  data() {
    return {
      otherSearchRow: {},
      routerConfig: {},
      loading: false,
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
      const stockKlineParams = {
        where: [
          {
            f12: this.routerConfig.f12,
            f40001: "day",
          },
        ],
      };
      this.loading = true;
      getKLineOne(stockKlineParams)
        .then((res) => {
          let { f40001, f40002 = "[]" } = res.data || {};
          let chartData = JSON.parse(f40002);
          //  时间/开/收/最高/最低/成交量/成交额/震幅/涨跌幅/涨跌额/换手率/流通股本
          chartData = stockKMap(chartData);
          this.$refs["k-line-chart"].refresh(chartData);
        })
        .finally(() => {
          this.loading = false;
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
