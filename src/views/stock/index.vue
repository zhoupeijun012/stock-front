<template>
  <div class="home">
    <ft-table
      :requestFunction="requestFunction"
      :options="options"
      ref="ft-table"
      v-bind="$attrs"
    >
    </ft-table>
    <base-detail ref="base-detail"></base-detail>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getStockList } from "@/api/index";
import BaseDetail from "../components/base-detail.vue";
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
export default {
  name: "home",
  components: {
    FtTable,
    BaseDetail,
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
            minWidth: "100px",
            cellStyle: (row) => {
              return {
                cursor: "pointer",
                color: "blue",
              };
            },
            fixed: "left",
            click: (row) => {
              this.toDetail(row);
            },
          },
          {
            prop: "f3",
            label: "涨跌幅",
            minWidth: "100px",
            sortable: "custom",
            fixed: "left",
            cellStyle: (row) => {
              return valueStyle(row.f3);
            },
            formatter: (row) => {
              return formatPrec(row.f3, "%");
            },
          },
          {
            prop: "f62",
            label: "主力净流入",
            minWidth: "120px",
            fixed: "left",
            sortable: "custom",
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
            minWidth: "100px",
            sortable: "custom",
            formatter: (row) => {
              return formatMoney(row.f21);
            },
          },
          {
            prop: "f24",
            label: "60日涨幅",
            sortable: "custom",
            minWidth: "110px",
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
            minWidth: "100px",
          },
          {
            prop: "f20",
            label: "总市值",
            sortable: "custom",
            minWidth: "110px",
            formatter: (row) => {
              return formatMoney(row.f20);
            },
          },
          {
            prop: "f4",
            label: "涨跌额",
            minWidth: "100px",
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
            minWidth: "100px",
            sortable: "custom",
            formatter: (row) => {
              return formatPrec(row.f2);
            },
          },
          {
            prop: "f12",
            label: "成交量(手)",
            minWidth: "110px",
            sortable: "custom",
            formatter: (row) => {
              return formatMoney(row.f12);
            },
          },
          {
            prop: "f6",
            label: "成交额",
            minWidth: "120px",
            sortable: "custom",
            formatter: (row) => {
              return formatMoney(row.f6);
            },
          },
          {
            prop: "f7",
            label: "振幅",
            minWidth: "100px",
            sortable: "custom",
            formatter: (row) => {
              return formatPrec(row.f7, "%");
            },
          },
          {
            prop: "f23",
            label: "市净率",
            minWidth: "100px",
            sortable: "custom",
            formatter: (row) => {
              return formatPrec(row.f23);
            },
          },

          {
            prop: "f100",
            label: "行业",
            minWidth: "100px",
            showOverflowTooltip: true,
          },
          {
            prop: "f102",
            label: "地区板块",
            minWidth: "100px",
            showOverflowTooltip: true,
          },
          {
            prop: "f103",
            label: "概念",
            minWidth: "100px",
            showOverflowTooltip: true,
          },

          {
            prop: "f10",
            label: "量比",
            minWidth: "80px",
            sortable: "custom",
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
            minWidth: "90px",
            sortable: "custom",
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
            minWidth: "90px",
            sortable: "custom",
            formatter: (row) => {
              return formatPrec(row.f9);
            },
          },
          {
            prop: "f11",
            label: "5分涨跌",
            minWidth: "100px",
            sortable: "custom",
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
            align: "center",
            minWidth: "110px",
          },
          {
            prop: "f40004",
            label: "历史最低价",
            align: "center",
            minWidth: "110px",
          },
          {
            prop: "f40005",
            label: "暴跌倍数",
            minWidth: "100px",
            align: "center",
            sortable: "custom",
            formatter: (row) => {
              return row.f40005 <= 1 ? "历史新高" : row.f40005;
            },
          },
          {
            prop: "f40006",
            label: "924倍数",
            minWidth: "100px",
            align: "center",
            sortable: "custom",
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
            minWidth: "100px",
            align: "center",
            sortable: "custom",
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
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f40008);
            },
            sortable: "custom",
            fixed: "right",
            align: "center",
          },
          {
            prop: "f40009",
            label: "排列涨幅",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f40009);
            },
            formatter: (row) => {
              return formatPrec(row.f40009, "%");
            },
            sortable: "custom",
            fixed: "right",
            align: "center",
          },
          {
            prop: "f40010",
            label: "60线天数",
            minWidth: "110px",
            cellStyle: (row) => {
              return valueStyle(row.f40010);
            },
            sortable: "custom",
            fixed: "right",
            align: "center",
          },
          {
            prop: "f40011",
            label: "60线涨幅",
            minWidth: "110px",
            cellStyle: (row) => {
              return valueStyle(row.f40011);
            },
            formatter: (row) => {
              return formatPrec(row.f40011, "%");
            },
            sortable: "custom",
            fixed: "right",
            align: "center",
          },
          {
            prop: "f50004",
            label: "流入天数",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f50004);
            },
            sortable: "custom",
            fixed: "right",
            align: "center",
          },
          {
            prop: "f50005",
            label: "流入金额",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f50005);
            },
            formatter: (row) => {
              return formatMoney(row.f50005);
            },
            sortable: "custom",
            fixed: "right",
            align: "center",
          },
        ],
      },
    };
  },
  methods: {
    toDetail(row) {
      this.$refs["base-detail"].show({
        title: row.f14,
        ...row,
      });
    },
    requestFunction(params) {
      params["matchKey"] = this.options.columns.map((item) => item.prop);
      if (params.where["f6666_ext"]) {
        params.where["f6666"] = params.where["f6666_ext"];
        delete params.where["f6666_ext"];
      }
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
      return getStockList(params);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
