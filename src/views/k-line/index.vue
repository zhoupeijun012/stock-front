<template>
  <div class="home">
    <ft-table
      :requestFunction="requestFunction"
      :options="options"
      ref="ft-table"
    >
      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template scope="scope">
          <el-button type="text" @click="toDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column></ft-table
    >
    <k-detail ref="k-detail"></k-detail>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getKLineList } from "@/api/index";
import KDetail from "./components/k-detail.vue";
export default {
  name: "home",
  components: {
    FtTable,
    KDetail,
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
            showOverflowTooltip: true,
            cellStyle: (row) => {
              return {
                color: "blue",
              };
            },
            fixed: "left",
          },
          {
            prop: "f40008",
            label: "多头排列",
            minWidth: "80px",
            formatter: (row) => {
              return row.f40008 == 1 ? "是" : "否";
            },
            cellStyle: (row) => {
              return {
                color: row.f40008 == 1 ? "red" : "blue",
              };
            },
            fixed: "left",
            align: "center",
          },
          {
            prop: "f40009",
            label: "排列天数",
            minWidth: "100px",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
            fixed: "left",
            align: "center",
          },
          {
            prop: "f40010",
            label: "站上60日均线",
            minWidth: "120px",
            fixed: "left",
            cellStyle: (row) => {
              return {
                color: row.f40010 == 1 ? "red" : "blue",
              };
            },
            align: "center",
            formatter: (row) => {
              return row.f40008 == 1 ? "是" : "否";
            },
          },
          {
            prop: "f40011",
            label: "60均线天数",
            minWidth: "100px",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
            align: "center",
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
            prop: "f40001",
            label: "K线类型",
            minWidth: "110px",
          },
          {
            prop: "f40005",
            label: "暴跌倍数",
            minWidth: "100px",
            formatter: (row) => {
              return row.f40005 <= 1 ? "历史新高" : row.f40005;
            },
          },
          {
            prop: "f40003",
            label: "历史最低价",
            align: "center",
            minWidth: "110px",
          },
          {
            prop: "f40004",
            label: "历史最高价",
            align: "center",
            minWidth: "110px",
          },
          {
            prop: "f40006",
            label: "924倍数",
            minWidth: "100px",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
            align: "center",
            fixed: "right",
          },
          {
            prop: "f40007",
            label: "205倍数",
            minWidth: "100px",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
            align: "center",
            fixed: "right",
          },
        ],
      },
    };
  },
  methods: {
    toDetail(row) {
      this.$refs["k-detail"].show({
        title: row.f14,
        ...row,
      });
    },
    requestFunction(params) {
      params["matchKey"] = this.options.columns.map((item) => item.prop);
      return getKLineList(params);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
