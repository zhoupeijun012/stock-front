<template>
  <drawer ref="drawer" :title="title" v-loading="loading">
    <fund-table ref="fund-table"></fund-table>
  </drawer>
</template>

<script>
import drawer from "@/components/drawer";
import FundTable from "./fund-table.vue";
import { getKLineOne, getFundOne } from "@/api/index";
import { fundKMap } from '@/utils/tool';
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
          this.$refs["fund-table"] && this.$refs["fund-table"].refresh(fundKMap(f50003).reverse());
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
