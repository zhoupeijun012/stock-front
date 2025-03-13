<template>
  <div class="home">
    <ft-table
      :requestFunction="requestFunction"
      :options="options"
      ref="ft-table"
      max-height="100%"
    >
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template scope="scope">
          <el-button type="text" @click="toDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column></ft-table
    >
    <base-detail ref="base-detail"></base-detail>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getEtfList } from "@/api/index";
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
        search: () => import("./components/search.vue"),
        columns: [
          {
            prop: "f14",
            label: "名称",
            width: "120x",
            fixed: "left",
            cellStyle: (row) => {
              return {
                color: "blue",
              };
            },
            "show-overflow-tooltip": true,
          },
          {
            prop: "f3",
            label: "涨跌幅",
            minWidth: "90px",
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
            prop: "f24",
            label: "60涨跌幅",
            minWidth: "110px",
            sortable: "custom",
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
            width: "80px",
            cellStyle: (row) => {
              return {};
            },
          },
          {
            prop: "f21",
            label: "流通市值",
            minWidth: "120px",
            sortable: "custom",
            formatter: (row) => {
              return row.f21 > 100000000 || row.f62 < -100000000
                ? parseInt((row.f21 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f21 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "c1",
            label: "交易类型",
            minWidth: "100px",
            formatter: (row) => {
              return row.c1 == "0" ? "T+0" : "T+1";
            },
          },
          {
            prop: "f2",
            label: "最新价",
            minWidth: "120px",
            sortable: "custom",
            formatter: (row) => {
              return row.f2 / 100;
            },
          },

          {
            prop: "f4",
            label: "涨跌额",
            minWidth: "120px",
            sortable: "custom",
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
            prop: "f12",
            label: "成交量(手)",
            minWidth: "120px",
            sortable: "custom",
            formatter: (row) => {
              return row.f12 > 100000000
                ? parseInt((row.f12 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f12 / 10000) * 100) / 100 + "万";
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
              return row.f10 > 100
                ? { color: "#f00" }
                : row.f10 == 100
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
  methods: {
    toDetail(row) {
            this.$refs["base-detail"].show({
        title: row.f14,
        ...row
      });
    },
    requestFunction(params) {
      params["where"]["c1"] = 0;
      params["matchKey"] = this.options.columns.map((item) => item.prop);
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
