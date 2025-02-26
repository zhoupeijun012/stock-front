<template>
  <div class="home">
    <ft-table
      :requestFunction="getRegionList"
      :options="options"
      ref="ft-table"
    ></ft-table>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getRegionList } from "@/api/index";
export default {
  name: "home",
  components: {
    FtTable,
  },
  data() {
    return {
      getRegionList,
      loading: false,
      options: {
        search: () => import("./components/search.vue"),
        columns: [
          {
            prop: "f14",
            label: "股票名称",
            minWidth: "100px",
            showOverflowTooltip: true,
            cellStyle: (row) => {
              return {
                color: "blue",
              };
            },
            fixed: "left",
          },
          {
            prop: "f3",
            label: "涨跌幅",
            minWidth: "100px",
            sortable: "custom",
            fixed: "left",
            cellStyle: (row) => {
              return row.f3 > 0
                ? { color: "#f00" }
                : row.f3 == 0
                ? { color: "#000" }
                : { color: "green" };
            },
            formatter: (row) => {
              return row.f3 / 100 + "%";
            },
          },

          {
            prop: "f21",
            label: "流通市值",
            minWidth: "100px",
            fixed: "left",
            sortable: "custom",
            formatter: (row) => {
              return row.f21 > 100000000 || row.f62 < -100000000
                ? parseInt((row.f21 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f21 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "f24",
            label: "60日涨幅",
            sortable: "custom",
            minWidth: "110px",
            fixed: "left",
            cellStyle: (row) => {
              return row.f24 > 0
                ? { color: "#f00" }
                : row.f24 == 0
                ? { color: "#000" }
                : { color: "green" };
            },
            formatter: (row) => {
              return row.f24 / 100 + "%";
            },
          },
          {
            prop: "f12",
            label: "股票代码",
            minWidth: "100px",
            cellStyle: (row) => {
              return {
                color: "blue",
              };
            },
          },
          {
            prop: "f20",
            label: "总市值",
            sortable: "custom",
            minWidth: "110px",
            formatter: (row) => {
              return row.f20 > 100000000 || row.f62 < -100000000
                ? parseInt((row.f20 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f20 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "f4",
            label: "涨跌额",
            minWidth: "100px",
            cellStyle: (row) => {
              return row.f4 > 0
                ? { color: "#f00" }
                : row.f4 == 0
                ? { color: "#000" }
                : { color: "green" };
            },
            formatter: (row) => {
              return row.f2 / 100;
            },
          },
          {
            prop: "f2",
            label: "最新价",
            minWidth: "100px",
            sortable: "custom",
            formatter: (row) => {
              return row.f2 / 100;
            },
          },
          {
            prop: "f6",
            label: "成交额",
            minWidth: "120px",
            sortable: "custom",
            formatter: (row) => {
              return row.f6 > 100000000 || row.f6 < -100000000
                ? parseInt((row.f6 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f6 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "f7",
            label: "振幅",
            minWidth: "100px",
            sortable: "custom",
            formatter: (row) => {
              return row.f7 / 100 + "%";
            },
          },

          {
            prop: "f10",
            label: "量比",
            minWidth: "80px",
            sortable: "custom",
            fixed: "right",
            cellStyle: (row) => {
              return row.f4 > 100
                ? { color: "#f00" }
                : row.f4 == 100
                ? { color: "#000" }
                : { color: "green" };
            },
            formatter: (row) => {
              return row.f10 / 100;
            },
          },
          {
            prop: "f8",
            label: "换手率",
            minWidth: "90px",
            sortable: "custom",
            fixed: "right",
            cellStyle: (row) => {
              return {
                color: "#f00",
              };
            },
            formatter: (row) => {
              return row.f8 / 100 + "%";
            },
          },
          {
            prop: "f9",
            label: "市盈率",
            minWidth: "90px",
            sortable: "custom",
            fixed: "right",
            formatter: (row) => {
              return row.f9 / 100;
            },
          },
          {
            prop: "f11",
            label: "5分涨跌",
            minWidth: "100px",
            sortable: "custom",
            fixed: "right",
            cellStyle: (row) => {
              return row.f11 > 0
                ? { color: "#f00" }
                : row.f11 == 0
                ? { color: "#000" }
                : { color: "green" };
            },
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
    });
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
