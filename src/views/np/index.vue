<template>
  <div class="home">
    <ft-table
      :requestFunction="requestFunction"
      :options="options"
      ref="ft-table"
    ></ft-table
    >
    <base-detail ref="base-detail"></base-detail>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getNpList } from "@/api/index";
import BaseDetail from "../components/base-detail.vue";
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
              return row.f8 / 100 + "%";
            },
          },
          {
            prop: "f11",
            label: "5分涨跌",
            minWidth: "100px",
            sortable: "custom",
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
