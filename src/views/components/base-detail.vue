<template>
  <div v-loading="loading">
    <slot></slot>
    <k-line-chart
      ref="k-line-chart"
      style="
        height: 330px;
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
  stockKMap,
  fundKMap,
  concatKFromDetail,
  concatFundFromDetail,
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
      baseDetail: {},
    };
  },
  computed: {
    title() {
      return this.routerConfig.title || "标题";
    },
  },
  methods: {
    detailLoaded(row) {
      this.loading = true;
      this.baseDetail = row;
      this.query().finally(() => {
        this.loading = false;
      });
    },
    getDetail(config) {
      this.routerConfig = config;
      this.loading = true;
    },
    query() {
      return Promise.all([
        getFundOne({
          where: [
            {
              f12: this.routerConfig.f12,
              f14: this.routerConfig.f14,
            },
          ],
        }),
        getKLineOne({
          where: [
            {
              f12: this.routerConfig.f12,
              f14: this.routerConfig.f14,
              f40001: "day",
            },
          ],
        }),
      ]).then(([fundRes, klineRes]) => {
        let f50003 = fundRes.data.f50003 || '[]';
        f50003 = concatFundFromDetail(f50003, this.baseDetail);
        this.$refs["fund-table"] &&
          this.$refs["fund-table"].refresh(fundKMap(f50003).reverse());

        let f40002 = klineRes.data.f40002 || '[]';
        f40002 = concatKFromDetail(f40002, this.baseDetail);
        this.$refs["k-line-chart"].refresh(stockKMap(f40002));
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
