<template>
  <div class="home">
    <ft-table
      :requestFunction="requestFunction"
      :options="options"
      ref="ft-table"
    ></ft-table>
    <base-detail ref="base-detail"></base-detail>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getNpList } from "@/api/index";
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
        columns: [
          {
            prop: "f14",
            label: "名称",
            minWidth: "100px",
            showOverflowTooltip: true,
            fixed: "left",
          },
          {
            prop: "f12",
            label: "股票代码",
            minWidth: "100px",
            cellStyle: (row) => {
              return {};
            },
          },
          {
            prop: "f3",
            label: "涨跌幅",
            minWidth: "100px",
            sortable: "custom",
            cellStyle: (row) => {
              return valueStyle(row.f3);
            },
            formatter: (row) => {
              return formatPrec(row.f3, "%");
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
      },
    };
  },
  mounted() {
    this.$refs["ft-table"].doQuery();
  },
  methods: {
    toDetail(row) {
      this.$refs["base-detail"].show({
        title: row.f14,
        ...row,
      });
    },
    requestFunction(params) {
      return getNpList(params);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
