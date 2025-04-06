<template>
  <drawer ref="drawer" :title="title" v-loading="loading">
    <fund-table ref="fund-table"></fund-table>
  </drawer>
</template>

<script>
import drawer from "@/components/drawer";
import FundTable from "./fund-table.vue";
import { getKLineOne, getFundOne } from "@/api/index";
export default {
  components: {
    drawer,
    FundTable,
  },
  data() {
    return {
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
      const stockDetailParams = {
        where: [
          {
            f12: this.routerConfig.f12,
          },
        ],
      };
      this.loading = true;
      getFundOne(stockDetailParams)
        .then((res) => {
          let { f14, f50003 = "[]" } = res.data || {};
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
          this.$refs["fund-table"] && this.$refs["fund-table"].refresh(f50003.reverse());
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
