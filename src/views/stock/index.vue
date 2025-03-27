<template>
  <div class="home">
    <ft-table
      :requestFunction="requestFunction"
      :options="options"
      ref="ft-table"
      v-bind="$attrs"
    >
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template scope="scope">
          <el-button type="text" @click="toDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </ft-table>
    <base-detail ref="base-detail"></base-detail>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getStockList } from "@/api/index";
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
            cellStyle: (row) => {
              return {};
            },
            fixed: "left",
          },
          {
            prop: "f3",
            label: "涨跌幅",
            minWidth: "100px",
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
            prop: "f62",
            label: "主力净流入",
            minWidth: "120px",
            fixed: "left",
            sortable: "custom",
            cellStyle: (row) => {
              return row.f62 > 0
                ? { color: "#f00" }
                : row.f62 == 0
                ? { color: "#000" }
                : { color: "green" };
            },
            formatter: (row) => {
              return row.f62 > 100000000 || row.f62 < -100000000
                ? parseInt((row.f62 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f62 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "f21",
            label: "流通市值",
            minWidth: "100px",
            sortable: "custom",
            formatter: (row) => {
              return row.f21 > 100000000 || row.f62 < -100000000
                ? parseInt((row.f21 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f21 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "f24",
            label: "60日涨幅",
            sortable: "custom",
            minWidth: "110px",
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
            minWidth: "100px",
            cellStyle: (row) => {
              return {};
            },
          },
          {
            prop: "f20",
            label: "总市值",
            sortable: "custom",
            minWidth: "110px",
            formatter: (row) => {
              return row.f20 > 100000000 || row.f62 < -100000000
                ? parseInt((row.f20 / 100000000) * 100) / 100 + "亿"
                : parseInt((row.f20 / 10000) * 100) / 100 + "万";
            },
          },
          {
            prop: "f4",
            label: "涨跌额",
            minWidth: "100px",
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
            prop: "f2",
            label: "最新价",
            minWidth: "100px",
            sortable: "custom",
            formatter: (row) => {
              return row.f2 / 100;
            },
          },
          {
            prop: "f12",
            label: "成交量(手)",
            minWidth: "110px",
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
            prop: "f23",
            label: "市净率",
            minWidth: "100px",
            sortable: "custom",
            formatter: (row) => {
              return row.f23 / 100;
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
              return row.f4 > 100
                ? { color: "#f00" }
                : row.f4 == 100
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
            prop: "f9",
            label: "市盈率",
            minWidth: "90px",
            sortable: "custom",
            formatter: (row) => {
              return row.f9 / 100;
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
            fixed: "right",
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
            sortable: "custom",
            fixed: "right",
            align: "center",
          },
          {
            prop: "f40010",
            label: "60均线",
            minWidth: "80px",
            cellStyle: (row) => {
              return {
                color: row.f40010 == 1 ? "red" : "blue",
              };
            },
            align: "center",
            fixed: "right",
            formatter: (row) => {
              return row.f40010 == 1 ? "是" : "否";
            },
          },
          {
            prop: "f40011",
            label: "60线天数",
            minWidth: "120px",
            cellStyle: (row) => {
              return {
                color: "red",
              };
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
