<template>
  <column-fold
    :row="stockInfo"
    :colums="foldColums"
    style="padding: 10px 0"
  ></column-fold>
</template>

<script>
import ColumnFold from "@/components/ft-table/column-fold.vue";
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
import { getStockOne } from "@/api/index";
export default {
  components: {
    ColumnFold,
  },
  data() {
    return {
      routerConfig: {},
      loading: false,
      stockInfo: {},
      foldColums: [
        {
          prop: "f103",
          label: "概念",
          span: 4,
          component: "concepts",
        },
        {
          prop: "f14",
          label: "名称",
          span: 5,
          component: "text-cell",
          cellStyle: (row) => {
            return {
              cursor: "pointer",
              color: "blue",
            };
          },
        },
        {
          prop: "f3",
          label: "涨跌幅",
          span: 5,
          component: "text-cell",
          cellStyle: (row) => {
            return valueStyle(row.f3);
          },
          formatter: (row) => {
            return formatPrec(row.f3, "%");
          },
        },

        {
          prop: "f40005",
          label: "暴跌倍数",
          span: 5,
          component: "text-cell",
          formatter: (row) => {
            return row.f40005 <= 1 ? "历史新高" : row.f40005;
          },
        },
        {
          prop: "f40006",
          label: "924倍数",
          span: 5,
          component: "text-cell",
          cellStyle: (row) => {
            return valueStyle(row.f40006);
          },
          formatter: (row) => {
            return formatPrec(row.f40006, "%");
          },
        },
        {
          prop: "f40007",
          label: "205倍数",
          span: 5,
          component: "text-cell",
          cellStyle: (row) => {
            return valueStyle(row.f40007);
          },
          formatter: (row) => {
            return formatPrec(row.f40007, "%");
          },
        },
        {
          prop: "f40008",
          label: "排列天数",
          span: 5,
          component: "text-cell",
          cellStyle: (row) => {
            return valueStyle(row.f40008);
          },
        },
        {
          prop: "f40009",
          label: "排列涨幅",
          span: 5,
          component: "text-cell",
          cellStyle: (row) => {
            return valueStyle(row.f40009);
          },
          formatter: (row) => {
            return formatPrec(row.f40009, "%");
          },
        },
        {
          prop: "f40010",
          label: "60线天数",
          span: 5,
          component: "text-cell",
          cellStyle: (row) => {
            return valueStyle(row.f40010);
          },
        },
        {
          prop: "f40011",
          label: "60线涨幅",
          span: 5,
          component: "text-cell",
          cellStyle: (row) => {
            return valueStyle(row.f40011);
          },
          formatter: (row) => {
            return formatPrec(row.f40011, "%");
          },
        },
        {
          prop: "f50004",
          label: "流入天数",
          span: 5,
          component: "text-cell",
          cellStyle: (row) => {
            return valueStyle(row.f50004);
          },
        },
        {
          prop: "f50005",
          label: "流入金额",
          span: 5,
          component: "text-cell",
          cellStyle: (row) => {
            return valueStyle(row.f50005);
          },
          formatter: (row) => {
            return formatMoney(row.f50005);
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
          prop: "f21",
          label: "流通市值",
          span: 5,
          component: "text-cell",
          formatter: (row) => {
            return formatMoney(row.f21);
          },
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
          prop: "f12",
          label: "股票代码",
          span: 5,
          component: "text-cell",
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
          prop: "f4",
          label: "涨跌额",
          span: 5,
          component: "text-cell",
          cellStyle: (row) => {
            return valueStyle(row.f4);
          },
          formatter: (row) => {
            return formatPrec(row.f4);
          },
        },
        {
          prop: "f2",
          label: "最新价",
          span: 5,
          component: "text-cell",
          formatter: (row) => {
            return formatPrec(row.f2);
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
            this.$refs["industry-detail"].show({
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
            this.$refs["region-detail"].show({
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
            return formatPrec(row.f8, "%");
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
      ],
    };
  },
  computed: {
    title() {
      return this.routerConfig.title || "标题";
    },
  },
  methods: {
    getDetail(row) {
      this.routerConfig = row;
      const stockDetailParams = {
        where: [
          {
            f12: this.routerConfig.f12,
          },
        ],
      };
      getStockOne(stockDetailParams).then((res) => {
        this.stockInfo = res.data;
      });
    },
  },
};
</script>
