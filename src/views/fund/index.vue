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
    <fund-detail ref="fund-detail"></fund-detail>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getFundList } from "@/api/index";
import FundDetail from "./components/fund-detail.vue";
export default {
  name: "home",
  components: {
    FtTable,
    FundDetail,
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
            prop: "f12",
            label: "股票代码",
            minWidth: "100px",
            cellStyle: (row) => {
              return {};
            },
          },
        ],
      },
    };
  },
  methods: {
    toDetail(row) {
      this.$refs["fund-detail"].show({
        title: row.f14,
        ...row,
      });
    },
    requestFunction(params) {
      params["matchKey"] = this.options.columns.map((item) => item.prop);
      return getFundList(params);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
