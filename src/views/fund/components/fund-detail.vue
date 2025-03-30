<template>
  <drawer ref="drawer" :title="title" v-loading="loading">
    <div style="width: 100%; height: 150px">
      <fund-bar ref="fund-bar"></fund-bar>
    </div>
    <div style="border-top: 8px solid #fafafa">
      <fund-table ref="fund-table"></fund-table>
    </div>
  </drawer>
</template>

<script>
import drawer from "@/components/drawer";
import { getFundOne } from '@/api/index'
import FundBar from "./fund-bar.vue";
import FundTable from "./fund-table.vue";
export default {
  components: {
    drawer,
    FundBar,
    FundTable,
  },
  data() {
    return {
      routerConfig: {},
      loading: false
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
      const params = {
        pageNum: 1,
        pageSize: 10000,
        where: [
          {
            f12: this.routerConfig.f12,
          },
        ],
      };
      this.loading = true;
      getFundOne(params).then((res) => {
        let { f14, f50003 = "[]" } = res.data || {};
        this.routerConfig.title = f14;
        f50003 = JSON.parse(f50003);
        f50003 = f50003.map((item) => {
          const arr = item.split(",");
          // 日期/主力净流入/小单净流入/中单净流入/大单净流入/超大单净流入/主力流入净占比/小单净占比/中单净占比/大单净占比/超大单净占比/收盘价/涨跌幅
          return {
            f221: arr[0],
            f62: arr[1],
            f84: arr[2],
            f78: arr[3],
            f72: arr[4],
            f66: arr[5],
            f2: arr[11],
            f3: arr[12],
          };
        });
        this.$refs['fund-bar'].refresh(f50003);
        this.$refs['fund-table'].refresh(f50003.reverse());
      }).finally(()=>{
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
