<template>
  <div class="home">
    <ft-table
      :requestFunction="requestFunction"
      :options="options"
      ref="ft-table"
      :default-sort="{ prop: 'f3', order: 'descending' }"
    ></ft-table>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getLimitList } from "@/api/index";
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
import dayjs from "dayjs";
export default {
  name: "home",
  components: {
    FtTable,
  },
  data() {
    return {
      loading: false,
      options: {
        search: () => import("./components/search.vue"),
        columns: [
          {
            prop: "f14",
            label: "名称",
            minWidth: "90px",
            cellStyle: (row) => {
              return {
                cursor: "pointer",
                color: "blue",
              };
            },
            click: (row) => {
              this.$stockDetail({
                title: row.f14,
                ...row,
              });
            },
          },
          {
            prop: "f3",
            label: "涨跌幅",
            minWidth: "80px",
            align: "center",
            cellStyle: (row) => {
              return valueStyle(row.f3);
            },
            formatter: (row) => {
              return formatPrec(row.f3 * 100, "%");
            },
          },
          {
            prop: "f40005",
            label: "暴跌倍数",
            minWidth: "80px",
            align: "center",

            formatter: (row) => {
              return row.f40005 <= 1 ? "历史新高" : row.f40005;
            },
          },
          {
            prop: "f40006",
            label: "924倍数",
            minWidth: "80px",
            align: "center",

            cellStyle: (row) => {
              return valueStyle(row.f40006);
            },
            formatter: (row) => {
              return formatPrec(row.f40006, "%");
            },
            align: "center",
          },
          {
            prop: "f40007",
            label: "205倍数",
            minWidth: "80px",
            align: "center",
            cellStyle: (row) => {
              return valueStyle(row.f40007);
            },
            formatter: (row) => {
              return formatPrec(row.f40007, "%");
            },
            align: "center",
          },
          {
            prop: "f40008",
            label: "排列天数",
            minWidth: "70px",
            cellStyle: (row) => {
              return valueStyle(row.f40008);
            },
            align: "center",
          },
          {
            prop: "f40009",
            label: "排列涨幅",
            minWidth: "90px",
            cellStyle: (row) => {
              return valueStyle(row.f40009);
            },
            formatter: (row) => {
              return formatPrec(row.f40009, "%");
            },
            align: "center",
          },
          {
            prop: "f40010",
            label: "60线天数",
            minWidth: "80px",
            cellStyle: (row) => {
              return valueStyle(row.f40010);
            },
            align: "center",
          },
          {
            prop: "f40011",
            label: "60线涨幅",
            minWidth: "80px",
            cellStyle: (row) => {
              return valueStyle(row.f40011);
            },
            formatter: (row) => {
              return formatPrec(row.f40011, "%");
            },
            align: "center",
          },
          {
            prop: "f50004",
            label: "流入天数",
            minWidth: "80px",
            cellStyle: (row) => {
              return valueStyle(row.f50004);
            },
            align: "center",
          },
          {
            prop: "f50005",
            label: "流入金额",
            minWidth: "90px",
            cellStyle: (row) => {
              return valueStyle(row.f50005);
            },
            formatter: (row) => {
              return formatMoney(row.f50005);
            },
            align: "center",
          },
          {
            prop: "f10005",
            label: "连板数",
            minWidth: "80px",
            align: "center",
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
            prop: "f10006",
            label: "涨停统计",
            minWidth: "80px",
            formatter: (row) => {
              return `${row.f10007}/${row.f10006}`;
            },
            align: "center",
          },
          {
            prop: "f10",
            label: "量比",
            minWidth: "80px",
            cellStyle: (row) => {
              return valueStyle(row.f10);
            },
            formatter: (row) => {
              return isNaN(row.f10) ? "-" : row.f10 / 100;
            },
            align: "center",
          },
          {
            prop: "f6",
            label: "成交额",
            minWidth: "70px",
            cellStyle: (row) => {
              return valueStyle(row.f6);
            },
            formatter: (row) => {
              return formatMoney(row.f6);
            },
            align: "left",
          },
        ],
        foldColums: [
          {
            prop: "f103",
            label: "概念",
            span: 4,
            component: "concepts",
            foldStyle: {
              height: "158px",
            },
            click: (row) => {
              this.$conceptDetail({
                title: row.f14,
                ...row,
              });
            },
          },
          {
            prop: "f12",
            label: "股票代码",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
          },
          {
            prop: "f21",
            label: "流通市值",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
            formatter: (row) => {
              return formatMoney(row.f21);
            },
          },

          {
            prop: "f20",
            label: "总市值",
            span: 5,
            component: "text-cell",
            formatter: (row) => {
              return formatMoney(row.f20);
            },
          },

          {
            prop: "f2",
            label: "最新价",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
            formatter: (row) => {
              return formatPrec(row.f2 / 10);
            },
          },
          {
            prop: "f12",
            label: "成交量(手)",
            span: 5,
            component: "text-cell",
            formatter: (row) => {
              return formatMoney(row.f12);
            },
          },
          {
            prop: "f6",
            label: "成交额",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
            formatter: (row) => {
              return formatMoney(row.f6);
            },
          },
          {
            prop: "f7",
            label: "振幅",
            span: 5,
            component: "text-cell",
            formatter: (row) => {
              return formatPrec(row.f7, "%");
            },
          },
          {
            prop: "f23",
            label: "市净率",
            span: 5,
            component: "text-cell",
            formatter: (row) => {
              return formatPrec(row.f23);
            },
          },
          {
            prop: "f100",
            label: "行业",
            span: 5,
            component: "cell-item",
            click: (row) => {
              this.$industryDetail({
                title: row.f14,
                ...row,
              });
            },
          },
          {
            prop: "f102",
            label: "地区板块",
            span: 5,
            component: "cell-item",
            click: (row) => {
              this.$regionDetail({
                title: row.f14,
                ...row,
              });
            },
          },

          {
            prop: "f10",
            label: "量比",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return valueStyle(row.f10);
            },
            formatter: (row) => {
              return isNaN(row.f10) ? "-" : row.f10 / 100;
            },
          },
          {
            prop: "f8",
            label: "换手率",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "#f00",
              };
            },
            formatter: (row) => {
              return formatPrec(row.f8 * 100, "%");
            },
          },
          {
            prop: "f9",
            label: "市盈率",
            span: 5,
            component: "text-cell",
            formatter: (row) => {
              return formatPrec(row.f9);
            },
          },
          {
            prop: "f11",
            label: "5分涨跌",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return valueStyle(row.f11);
            },
            formatter: (row) => {
              return formatPrec(row.f11, "%");
            },
          },
          {
            prop: "f40003",
            label: "历史最高价",
            span: 5,
            component: "text-cell",
          },
          {
            prop: "f40004",
            label: "历史最低价",
            span: 5,
            component: "text-cell",
          },
          {
            prop: "f24",
            label: "60日涨幅",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return valueStyle(row.f24);
            },
            formatter: (row) => {
              return formatPrec(row.f24, "%");
            },
          },
          {
            prop: "f62",
            label: "主力净流入",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return valueStyle(row.f62);
            },
            formatter: (row) => {
              return formatMoney(row.f62);
            },
          },
          {
            prop: "f267",
            label: "3日净流入",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return valueStyle(row.f267);
            },
            formatter: (row) => {
              return formatMoney(row.f267);
            },
          },

          {
            prop: "f164",
            label: "5日净流入",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return valueStyle(row.f164);
            },
            formatter: (row) => {
              return formatMoney(row.f164);
            },
          },
          {
            prop: "f63",
            label: "集合竞价",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
            formatter: (row) => {
              return formatMoney(row.f63);
            },
          },
          {
            prop: "f10002",
            label: "首次封板",
            span: 5,
            component: "text-cell",
            formatter: (row) => {
              let time = row.f10002.length > 5 ? row.f10002 : "0" + row.f10002;
              return `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(
                4
              )}`;
            },
          },
          {
            prop: "f10003",
            label: "最后封板",
            span: 5,
            component: "text-cell",
            formatter: (row) => {
              let time = row.f10003.length > 5 ? row.f10003 : "0" + row.f10003;
              return `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(
                4
              )}`;
            },
          },
          {
            prop: "f10001",
            label: "封板资金",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "#f00",
              };
            },
            formatter: (row) => {
              return formatMoney(row.f10001);
            },
          },
        ],
      },
    };
  },
  methods: {
    requestFunction(params) {
      params["matchKey"] = [...this.options.columns, ...this.options.foldColums]
        .map((item) => item.prop)
        .concat(["f10007", "date"]);
      if (params["where"]["date"]) {
        params["where"]["date"] = dayjs(params["where"]["date"]).format(
          "YYYYMMDD"
        );
      }
      return getLimitList(params);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
