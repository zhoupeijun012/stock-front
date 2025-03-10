<template>
  <div class="home">
    <ft-table
      :requestFunction="getLimitList"
      :options="options"
      ref="ft-table"
    ></ft-table>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getLimitList } from "@/api/index";
import dayjs from "dayjs";
export default {
  name: "home",
  components: {
    FtTable,
  },
  data() {
    return {
      getLimitList,
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
              return parseInt(row.f3 * 100) / 100 + "%";
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
            prop: "f10002",
            label: "首次封板",
            minWidth: "100px",
            sortable: "custom",
          },
          {
            prop: "f10003",
            label: "最后封板",
            minWidth: "100px",
            sortable: "custom",
          },
          {
            prop: "f10006",
            label: "涨停统计",
            minWidth: "100px",
            sortable: "custom",
            formatter: (row) => {
              return `${row.f10007}/${row.f10006}`;
            },
          },
          {
            prop: "f2",
            label: "最新价",
            minWidth: "100px",
            sortable: "custom",
            formatter: (row) => {
              return row.f2 / 1000;
            },
          },
          {
            prop: "date",
            label: "日期",
            minWidth: "100px",
            sortable: "custom",
          },
          {
            prop: "f10005",
            label: "连板数",
            minWidth: "90px",
            sortable: "custom",
            fixed: "right",
            cellStyle: (row) => {
              return {
                color: "#f00",
              };
            },
            formatter: (row) => {
              return row.f10005 + "连板";
            },
          },
          {
            prop: "f100",
            label: "所属行业",
            minWidth: "100px",
            sortable: "custom",
            fixed: "right",
            cellStyle: (row) => {
              return {
                color: "#f00",
              };
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
              return parseInt(row.f8 * 100) / 100 + "%";
            },
          },
          {
            prop: "f10001",
            label: "封板资金",
            minWidth: "100px",
            sortable: "custom",
            fixed: "right",
            cellStyle: (row) => {
              return {
                color: "#f00",
              };
            },
            formatter: (row) => {
              return row.f10001 > 100000000 || row.f10001 < -100000000
                ? parseInt((row.f10001 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f10001 / 10000) * 100) / 100 + "万";
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.$refs["ft-table"].query({
      matchKey: [
        ...this.options.columns.map((item) => item.prop),
        "f10007",
        "date",
      ],
    });
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
