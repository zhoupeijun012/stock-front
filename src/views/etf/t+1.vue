<template>
  <div class="home">
    <ft-table
      :requestFunction="requestFunction"
      :options="options"
      ref="ft-table"
      max-height="100%"
    >
    </ft-table>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getEtfList } from "@/api/index";
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
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
            width: "120x",
            "show-overflow-tooltip": true,
          },
          {
            prop: "f3",
            label: "涨跌幅",
            minWidth: "90px",
            sortable: "custom",
            cellStyle: (row) => {
              return valueStyle(row.f3);
            },
            formatter: (row) => {
              return formatPrec(row.f3, "%");
            },
          },
          {
            prop: "f24",
            label: "60涨跌幅",
            minWidth: "110px",
            sortable: "custom",
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
            width: "90px",
            cellStyle: (row) => {
              return {};
            },
          },
          {
            prop: "f21",
            label: "流通市值",
            minWidth: "120px",
            sortable: "custom",
            cellStyle: (row) => {
              return valueStyle(row.f21);
            },
            formatter: (row) => {
              return formatMoney(row.f21);
            },
          },

          {
            prop: "f2",
            label: "最新价",
            minWidth: "120px",
            sortable: "custom",
            formatter: (row) => {
              return formatPrec(row.f2);
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
        ],
        foldColums: [
          {
            prop: "c1",
            label: "交易类型",
            span: 4,
            component: "text-cell",
            formatter: (row) => {
              return row.c1 == "0" ? "T+0" : "T+1";
            },
          },
          {
            prop: "f4",
            label: "涨跌额",
            span: 4,
            component: "text-cell",
            cellStyle: (row) => {
              return valueStyle(row.f4);
            },
            formatter: (row) => {
              return formatPrec(row.f4);
            },
          },
          {
            prop: "f12",
            label: "成交量(手)",
            span: 4,
            component: "text-cell",
            formatter: (row) => {
              return formatMoney(row.f12);
            },
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
      params["where"]["c1"] = 1;
      params["matchKey"] = [...this.options.columns,...this.options.foldColums].map((item) => item.prop);
      return getEtfList(params);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
