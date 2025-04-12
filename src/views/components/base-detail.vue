<template>
  <div v-loading="loading">
    <slot></slot>
    <k-line-chart
      ref="k-line-chart"
      style="
        height: 35vh;
        min-height: 330px;
        border-top: 8px solid rgb(250, 250, 250);
        padding: 0 8px;
      "
    ></k-line-chart>
    <fund-table
      ref="fund-table"
      style="border-top: 8px solid rgb(250, 250, 250)"
    ></fund-table>
  </div>
</template>

<script>
import KLineChart from "@/views/k-line/components/k-line-chart.vue";
import FundTable from "@/views/fund/components/fund-table.vue";
import { getKLineOne, getFundOne } from "@/api/index";
import {
  formatMoney,
  valueStyle,
  formatPrec,
  stockKMap,
  fundKMap,
} from "@/utils/tool";

export default {
  components: {
    KLineChart,
    FundTable,
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
    getDetail(config) {
      this.routerConfig = config;
      this.loading = true;
      this.query().finally(() => {
        this.loading = false;
      });
    },
    async query() {
      const stockDetailParams = {
        where: [
          {
            f12: this.routerConfig.f12,
            f14: this.routerConfig.f14,
          },
        ],
      };
      let { f14, f50003 = "[]" } =
        (await getFundOne(stockDetailParams)).data || {};
      f50003 = JSON.parse(f50003);
      // f50003 = f50003.map((item) => {
      //   const arr = item.split(",");
      //   // 日期/主力净流入/小单净流入/中单净流入/大单净流入/超大单净流入/主力流入净占比/小单净占比/中单净占比/大单净占比/超大单净占比/收盘价/涨跌幅
      //   return {
      //     f124: arr[0],
      //     f62: arr[1],
      //     f84: arr[2],
      //     f78: arr[3],
      //     f72: arr[4],
      //     f66: arr[5],
      //     f2: arr[11],
      //     f3: arr[12],
      //   };
      // });
      this.$refs["fund-table"] &&
        this.$refs["fund-table"].refresh(fundKMap(f50003).reverse());

      const stockKlineParams = {
        where: [
          {
            f12: this.routerConfig.f12,
            f14: this.routerConfig.f14,
            f40001: "day",
          },
        ],
      };

      let { f40001, f40002 = "[]" } =
        (await getKLineOne(stockKlineParams)).data || {};
        f40002 = JSON.parse(f40002)
      this.$refs["k-line-chart"].refresh(stockKMap(f40002));
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
.content-warp {
  display: flex;
  .content-left,
  .content-right {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
  }
  .content-right {
    border-left: 8px solid rgb(250, 250, 250);
  }
}
</style>
