<template>
  <div class="home">
    <ft-table
      :tableFunction="tableFunction"
      :cardFunction="cardFunction"
      :options="options"
      ref="ft-table"
    >
      <el-table-column label="操作" width="60" align="center" fixed='right'>
        <template scope="scope">
          <el-button type="text" @click="toDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column></ft-table
    >
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getConceptList, getKLineList } from "@/api/index";
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
import StockCard from "@/views/stock/components/stock-card.vue";
export default {
  name: "home",
  components: {
    FtTable,
  },
  data() {
    return {
      loading: false,
      options: {
        search: () =>
          import(/* webpackChunkName:"stock" */ "./components/search.vue"),
        defaultSort: { prop: "f3", order: "descending" },
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
              this.$conceptDrilling({
                title: row.f14,
                ...row,
              });
            },
          },
          {
            prop: "f3",
            label: "涨跌幅",
            minWidth: "75px",
            sortable: "custom",
            cellStyle: (row) => {
              return valueStyle(row.f3);
            },
            formatter: (row) => {
              return formatPrec(row.f3, "%");
            },
          },
          {
            prop: "f40014",
            label: "金叉",
            minWidth: "70px",
            align: "center",
            sortable: "custom",
            cellStyle: (row) => {
              return {
                color: "#f00",
              };
            },
          },
          {
            prop: "goldenCrossCount",
            label: "金叉数",
            minWidth: "80px",
            align: "center",
            sortable: "custom",
                     cellStyle: (row) => {
              return {
                color: "#f00",
              };
            },
          },
          {
            prop: "deathCrossCount",
            label: "死叉数",
            minWidth: "80px",
            align: "center",
            sortable: "custom",
                     cellStyle: (row) => {
              return {
                color: "#f00",
              };
            },
          },
          // {
          //   prop: "f40006",
          //   label: "924倍数",
          //   minWidth: "95px",
          //   align: "left",
          //   sortable: "custom",
          //   cellStyle: (row) => {
          //     return valueStyle(row.f40006);
          //   },
          //   formatter: (row) => {
          //     return formatPrec(row.f40006, "%");
          //   },
          // },
          // {
          //   prop: "f40007",
          //   label: "205倍数",
          //   minWidth: "95px",
          //   align: "left",
          //   sortable: "custom",
          //   cellStyle: (row) => {
          //     return valueStyle(row.f40007);
          //   },
          //   formatter: (row) => {
          //     return formatPrec(row.f40007, "%");
          //   },
          // },

          {
            prop: "f40008",
            label: "排列天数",
            minWidth: "90px",
            cellStyle: (row) => {
              return valueStyle(row.f40008);
            },
            sortable: "custom",
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
            sortable: "custom",
            align: "center",
          },
          {
            prop: "f40010",
            label: "60线天数",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f40010);
            },
            sortable: "custom",
            align: "center",
          },
          {
            prop: "f40011",
            label: "60线涨幅",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f40011);
            },
            formatter: (row) => {
              return formatPrec(row.f40011, "%");
            },
            sortable: "custom",
            align: "center",
          },
          {
            prop: "f50004",
            label: "流入天数",
            minWidth: "90px",
            cellStyle: (row) => {
              return valueStyle(row.f50004);
            },
            sortable: "custom",
            align: "center",
            fixed:'right'
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
            sortable: "custom",
            align: "left",
            fixed:'right'
          },
          {
            label: "连阳",
            prop: "f40015",
            minWidth: "70px",
            cellStyle: (row) => {
              return {
                color: 'red'
              }
            },
            sortable: "custom",
            align: "center",
            fixed:'right'
          },
          {
            prop: "f6",
            label: "成交额",
            minWidth: "80px",
            cellStyle: (row) => {
              return valueStyle(row.f6);
            },
            formatter: (row) => {
              return formatMoney(row.f6);
            },
            sortable: "custom",
            align: "left",
            fixed:'right'
          },
        ],
        foldColums: [
          {
            prop: "f12",
            label: "股票代码",
            span: 4,
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
            span: 4,
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
            span: 4,
            component: "text-cell",
            formatter: (row) => {
              return formatMoney(row.f20);
            },
          },

          {
            prop: "f2",
            label: "最新价",
            span: 4,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
            formatter: (row) => {
              return formatPrec(row.f2);
            },
          },
          {
            prop: "f7",
            label: "振幅",
            span: 4,
            component: "text-cell",
            formatter: (row) => {
              return formatPrec(row.f7, "%");
            },
          },
          {
            prop: "f8",
            label: "换手率",
            span: 4,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "#f00",
              };
            },
            formatter: (row) => {
              return formatPrec(row.f8, "%");
            },
          },
          {
            prop: "f9",
            label: "市盈率",
            span: 4,
            component: "text-cell",
            formatter: (row) => {
              return formatPrec(row.f9);
            },
          },
          {
            prop: "f11",
            label: "5分涨跌",
            span: 4,
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
            span: 4,
            component: "text-cell",
          },
          {
            prop: "f40004",
            label: "历史最低价",
            span: 4,
            component: "text-cell",
          },
          {
            prop: "f24",
            label: "60日涨幅",
            span: 4,
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
            span: 4,
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
            span: 4,
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
            span: 4,
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
            span: 4,
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
            prop: "f104",
            label: "上涨家数",
            span: 4,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
          },
          {
            prop: "f105",
            label: "下跌家数",
            span: 4,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "green",
              };
            },
          },
          {
            prop: "f106",
            label: "平家家数",
            span: 4,
            component: "text-cell",
          },
          {
            prop: "f128",
            label: "板块领涨股",
            span: 4,
            cellStyle: (row) => {
              return {
                border: "1px solid #dcdfe6",
                padding: "0 4px",
                "border-radius": "4px",
                cursor: "pointer",
                "user-select": "none",
                color: "red",
                lineHeight: "24px",
              };
            },
            click: (row) => {
              this.$stockDetail({
                title: row.f128,
                f14: row.f128,
              });
            },
            component: "text-cell",
          },
        ],
        cardComponent: StockCard,
        cardOptions: {
          detailClick: (row) => {
            this.$conceptDetail({
              title: row.f14,
              ...row,
            });
          },
        },
      },
    };
  },
  methods: {
    toDetail(row) {
      this.$conceptDetail({
        title: row.f14,
        ...row,
      });
    },
    getParams(params) {
      if (params.where["f40006_ext"]) {
        params.where["f40006"] = params.where["f40006_ext"];
        delete params.where["f40006_ext"];
      }
      if (params.where["f40007_ext"]) {
        params.where["f40007"] = params.where["f40007_ext"];
        delete params.where["f40007_ext"];
      }
      if (params.where["f40008_ext"]) {
        params.where["f40008"] = params.where["f40008_ext"];
        delete params.where["f40008_ext"];
      }
      if (params.where["f40009_ext"]) {
        params.where["f40009"] = params.where["f40009_ext"];
        delete params.where["f40009_ext"];
      }
      if (params.where["f40010_ext"]) {
        params.where["f40010"] = params.where["f40010_ext"];
        delete params.where["f40010_ext"];
      }
      if (params.where["f40011_ext"]) {
        params.where["f40011"] = params.where["f40011_ext"];
        delete params.where["f40011_ext"];
      }
      if (params.where["f50004_ext"]) {
        params.where["f50004"] = params.where["f50004_ext"];
        delete params.where["f50004_ext"];
      }
      if (params.where["f21_ext"]) {
        params.where["f21"] = params.where["f21_ext"];
        delete params.where["f21_ext"];
      }
      params.whereNot = {
        f12: ["BK1051", "BK0816", "BK1050"],
      };
    },
    tableFunction(params) {
      params["matchKey"] = [
        ...this.options.columns,
        ...this.options.foldColums,
      ].map((item) => item.prop);
      params["matchKey"] = params["matchKey"].filter((item)=>!['goldenCrossCount','deathCrossCount'].includes(item));

      this.getParams(params);
      return getConceptList(params);
    },
    async cardFunction(params) {
      params["matchKey"] = [
        ...this.options.columns,
        ...this.options.foldColums,
      ].map((item) => item.prop);

      params["matchKey"] = params["matchKey"].filter((item)=>!['goldenCrossCount','deathCrossCount'].includes(item));

      params["matchKey"] = params["matchKey"].concat([
        "f17",
        "f2",
        "f15",
        "f16",
        "f5",
        "f4",
      ]);
      this.getParams(params);

      const stockRes = await getConceptList(params);
      const klineRes = await getKLineList({
        pageNum: 1,
        pageSize: params.pageSize,
        where: {
          f12: (stockRes.list || []).map((item) => item.f12),
          f40001: "day",
        },
      });
      stockRes.list.forEach((stockItem) => {
        const findObj = (klineRes.list || []).find((lineItem) => {
          return lineItem.f12 == stockItem.f12;
        });

        if (findObj) {
          stockItem["f40002"] = findObj["f40002"];
        }
      });
      return stockRes;
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
