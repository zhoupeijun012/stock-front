<template>
  <div class="home">
    <ft-table
      :requestFunction="getEtfList"
      :options="options"
      ref="ft-table"
      max-height="100%"
    ></ft-table>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getEtfList } from "@/api/index";
export default {
  name: "home",
  components: {
    FtTable,
  },
  data() {
    return {
      getEtfList,
      loading: false,
      options: {
        search: ()=>import('./components/search.vue'),
        columns: [
          {
            prop: "f14",
            label: "股票名称",
            width: "140x",
            fixed: "left",
            "show-overflow-tooltip": true,
          },
          { prop: "f12", label: "股票代码", width: "80px", fixed: "left" },
          {
            prop: "f21",
            label: "流通市值",
            fixed: "left",
            formatter: (row) => {
              return row.f21 > 100000000 || row.f62 < -100000000
                ? parseInt((row.f21 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f21 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop:'c1',
            label:'交易类型',
            formatter: (row) => {
              return row.c1 == '0' ? 'T+0': 'T+1';
            },
          },
          {
            prop: "f24",
            label: "60涨跌幅",
            formatter: (row) => {
              return row.f24 / 100 + "%";
            },
          },
          {
            prop: "f2",
            label: "最新价",
            formatter: (row) => {
              return row.f2 / 100;
            },
          },
          {
            prop: "f3",
            label: "涨跌幅",
            formatter: (row) => {
              return row.f3 / 100 + "%";
            },
          },
          {
            prop: "f4",
            label: "涨跌额",
            formatter: (row) => {
              return row.f2 / 100;
            },
          },
          {
            prop: "f12",
            label: "成交量(手)",
            formatter: (row) => {
              return row.f12 > 100000000
                ? parseInt((row.f12 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f12 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "f6",
            label: "成交额",
            formatter: (row) => {
              return row.f6 > 100000000 || row.f6 < -100000000
                ? parseInt((row.f6 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f6 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "f7",
            label: "振幅",
            formatter: (row) => {
              return row.f7 / 100 + "%";
            },
          },
          {
            prop: "f10",
            label: "量比",
            formatter: (row) => {
              return row.f10 / 100;
            },
          },
          {
            prop: "f8",
            label: "换手率",
            formatter: (row) => {
              return row.f8 / 100 + '%';
            },
          },
          {
            prop: "f11",
            label: "5分钟涨跌",
            formatter: (row) => {
              return row.f11 / 100 + "%";
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.$refs["ft-table"].query({
      matchKey: this.options.columns.map((item) => item.prop),
      filters: {
        'c1': 1
      }
    });
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
