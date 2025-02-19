<template>
  <div class="home">
    <ft-table
      :requestFunction="getStockList"
      :options="options"
      ref="ft-table"
    ></ft-table>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getStockList } from "@/api/index";
export default {
  name: "home",
  components: {
    FtTable,
  },
  data() {
    return {
      getStockList,
      loading: false,
      options: {
        search: ()=>import('./components/search.vue'),
        columns: [
          { prop: "f14", label: "股票名称", width: "100px", fixed: "left" },
          { prop: "f12", label: "股票代码", width: "100px", fixed: "left" },
          {
            prop: "f21",
            label: "流通市值",
            width: "100px",
            fixed: "left",
            sortable:"custom",
            formatter: (row) => {
              return row.f21 > 100000000 || row.f62 < -100000000
                ? parseInt((row.f21 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f21 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "f62",
            label: "主力净流入",
            width: "120px",
            fixed: "left",
            sortable:"custom",
            formatter: (row) => {
              return row.f62 > 100000000 || row.f62 < -100000000
                ? parseInt((row.f62 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f62 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "f20",
            label: "总市值",
            sortable:"custom",
            width: "110px",
            formatter: (row) => {
              return row.f20 > 100000000 || row.f62 < -100000000
                ? parseInt((row.f20 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f20 / 10000) * 100) / 100 + "万";
            },
          },

          {
            prop: "f24",
            label: "60日涨幅",
            sortable:"custom",
            width: "110px",
            formatter: (row) => {
              return row.f24 / 100 + "%";
            },
          },
          {
            prop: "f2",
            label: "最新价",
            width: "100px",
            sortable:"custom",
            formatter: (row) => {
              return row.f2 / 100;
            },
          },
          {
            prop: "f3",
            label: "涨跌幅",
            width: "100px",
            sortable:"custom",
            formatter: (row) => {
              return row.f3 / 100 + "%";
            },
          },
          {
            prop: "f4",
            label: "涨跌额",
            width: "100px",
            formatter: (row) => {
              return row.f2 / 100;
            },
          },
          {
            prop: "f12",
            label: "成交量(手)",
            width: "110px",
            sortable:"custom",
            formatter: (row) => {
              return row.f12 > 100000000
                ? parseInt((row.f12 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f12 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "f6",
            label: "成交额",
            width: "100px",
            sortable:"custom",
            formatter: (row) => {
              return row.f6 > 100000000 || row.f6 < -100000000
                ? parseInt((row.f6 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f6 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "f7",
            label: "振幅",
            width: "100px",
            sortable:"custom",
            formatter: (row) => {
              return row.f7 / 100 + "%";
            },
          },
          {
            prop: "f10",
            label: "量比",
            width: "100px",
            sortable:"custom",
            formatter: (row) => {
              return row.f10 / 100;
            },
          },
          {
            prop: "f8",
            label: "换手率",
            width: "100px",
            sortable:"custom",
            formatter: (row) => {
              return row.f8 / 100;
            },
          },
          {
            prop: "f9",
            label: "市盈率",
            width: "100px",
            sortable:"custom",
            formatter: (row) => {
              return row.f9 / 100;
            },
          },
          {
            prop: "f23",
            label: "市净率",
            width: "100px",
            sortable:"custom",
            formatter: (row) => {
              return row.f23 / 100;
            },
          },
          { prop: "f11", label: "5分钟涨跌", width: "100px" },
          {
            prop: "f63",
            label: "集合竞价",
            width: "100px",
            sortable:"custom",
            formatter: (row) => {
              return row.f6 > 100000000 || row.f6 < -100000000
                ? parseInt((row.f6 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f6 / 10000) * 100) / 100 + "万";
            },
          },
          { prop: "f100", label: "行业", width: "100px",sortable:"custom", fixed: "right" },
          { prop: "f102", label: "地区板块", width: "100px",sortable:"custom", fixed: "right" },
        ],
      },
    };
  },
  mounted() {
    this.$refs["ft-table"].query({
      matchKey: this.options.columns.map((item) => item.prop),
    });
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
