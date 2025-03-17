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
    <base-detail ref="base-detail"></base-detail>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getKLineList } from "@/api/index";
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
          {
            prop: "f40001",
            label: "K线类型",
            minWidth: "110px",
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
