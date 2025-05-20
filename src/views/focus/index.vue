<template>
  <div>
    <div
      style="
        padding: 12px;
        box-sizing: border-box;
        border-bottom: 1px solid #f3f4f5;
      "
    >
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="
          dialogVisible = true;
          form.f12 = [];
        "
        >新增</el-button
      >
      <el-button type="primary" icon="el-icon-delete" @click="clearAll"
        >清空</el-button
      >
    </div>
    <div style="background: #fff">
      <ft-table
        :tableFunction="tableFunction"
        :options="options"
        ref="ft-table"
        :autoHeight="false"
        :showPager="false"
        class="ft-table"
      >
        <el-table-column label="操作" width="60" align="center" fixed="right">
          <template scope="scope">
            <el-button type="text" @click="deleteRow(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </ft-table>
    </div>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="30%"
      v-if="dialogVisible"
    >
      <el-form :model="form">
        <el-form-item>
          <el-select
            v-model="form.f12"
            style="width: 100%"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="querySearchAsync"
            :loading="searchLoading"
          >
            <el-option
              v-for="item in f12Options"
              :key="item.value"
              :label="`${item.label}（${item.value}）`"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import FtTable from "@/components/ft-table";
import { getStockList } from "@/api/index";
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
import LazySelect from "@/components/lazy-select";

const FOCUS_KEY = "focus";
export default {
  components: {
    FtTable,
    LazySelect,
  },
  data() {
    return {
      getStockList,
      loading: false,
      searchLoading: false,
      dialogVisible: false,
      options: {
        defaultSort: { prop: "f3", order: "descending" },
        columns: [
          {
            prop: "f14",
            label: "名称",
            width: "90px",
            cellStyle: (row) => {
              if (row.f40006 && row.f40006 <= 6000) {
                return {
                  cursor: "pointer",
                  color: "gold",
                };
              }
              return {
                cursor: "pointer",
                color: "blue",
              };
            },
            click: (row) => {
              this.$stockDetail({
                title: row.f14,
                ...row,
              });
            },
          },
          {
            prop: "f3",
            label: "涨跌幅",
            minWidth: "75px",
            sortable: "custom",
            cellStyle: (row) => {
              return valueStyle(row.f3);
            },
            formatter: (row) => {
              return formatPrec(row.f3, "%");
            },
          },
          {
            prop: "f40014",
            label: "金叉",
            minWidth: "70px",
            align: "center",
            sortable: "custom",
            cellStyle: (row) => {
              return {
                color: "#f00",
              };
            },
          },
          // {
          //   prop: "f40005",
          //   label: "暴跌倍数",
          //   minWidth: "90px",
          //   align: "left",
          //   sortable: "custom",
          //   formatter: (row) => {
          //     return row.f40005 <= 1 ? "历史新高" : row.f40005;
          //   },
          // },
          {
            prop: "f40006",
            label: "924倍数",
            minWidth: "95px",
            align: "left",
            sortable: "custom",
            cellStyle: (row) => {
              return valueStyle(row.f40006);
            },
            formatter: (row) => {
              return formatPrec(row.f40006, "%");
            },
          },

          {
            prop: "f40008",
            label: "排列天数",
            minWidth: "90px",
            cellStyle: (row) => {
              return valueStyle(row.f40008);
            },
            sortable: "custom",
            align: "center",
          },
          {
            prop: "f40009",
            label: "排列涨幅",
            minWidth: "90px",
            cellStyle: (row) => {
              return valueStyle(row.f40009);
            },
            formatter: (row) => {
              return formatPrec(row.f40009, "%");
            },
            sortable: "custom",
            align: "center",
          },
          {
            prop: "f40010",
            label: "60线天数",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f40010);
            },
            sortable: "custom",
            align: "center",
          },
          {
            prop: "f40011",
            label: "60线涨幅",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f40011);
            },
            formatter: (row) => {
              return formatPrec(row.f40011, "%");
            },
            sortable: "custom",
            align: "center",
          },
          //   {
          //     prop: "f40012",
          //     label: "趋势天数",
          //     minWidth: "100px",
          //     cellStyle: (row) => {
          //       return valueStyle(row.f40012);
          //     },
          //     sortable: "custom",
          //     align: "center",
          //   },
          //   {
          //     prop: "f40013",
          //     label: "趋势涨幅",
          //     minWidth: "100px",
          //     cellStyle: (row) => {
          //       return valueStyle(row.f40013);
          //     },
          //     formatter: (row) => {
          //       return formatPrec(row.f40013, "%");
          //     },
          //     sortable: "custom",
          //     align: "center",
          //   },
          {
            prop: "f50004",
            label: "流入天数",
            minWidth: "90px",
            cellStyle: (row) => {
              return valueStyle(row.f50004);
            },
            sortable: "custom",
            align: "center",
          },
          {
            prop: "f50005",
            label: "流入金额",
            minWidth: "90px",
            cellStyle: (row) => {
              return valueStyle(row.f50005);
            },
            formatter: (row) => {
              return formatMoney(row.f50005);
            },
            sortable: "custom",
            align: "left",
          },
          {
            prop: "f40015",
            label: "连阳",
            minWidth: "70px",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
            sortable: "custom",
            align: "center",
            fixed: 'right'
          },
          // {
          //   prop: "f10",
          //   label: "量比",
          //   minWidth: "80px",
          //   cellStyle: (row) => {
          //     return valueStyle(row.f10);
          //   },
          //   formatter: (row) => {
          //     return isNaN(row.f10) ? "-" : row.f10 / 100;
          //   },
          //   sortable: "custom",
          //   align: "center",
          // },
          {
            prop: "f6",
            label: "成交额",
            minWidth: "80px",
            cellStyle: (row) => {
              return valueStyle(row.f6);
            },
            formatter: (row) => {
              return formatMoney(row.f6);
            },
            sortable: "custom",
            align: "left",
            fixed: 'right'
          },
        ],
        foldColums: [
          {
            prop: "f103",
            label: "概念",
            span: 4,
            component: "concepts",
            foldStyle: {
              height: "135px",
            },
            click: (row) => {
              this.$conceptDetail({
                title: row.f14,
                ...row,
              });
            },
          },
          {
            prop: "f12",
            label: "股票代码",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
          },
          {
            prop: "f21",
            label: "流通市值",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
            formatter: (row) => {
              return formatMoney(row.f21);
            },
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
            prop: "f2",
            label: "最新价",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
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
              this.$industryDetail({
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
              this.$regionDetail({
                title: row.f14,
                ...row,
              });
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
            prop: "f267",
            label: "3日净流入",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return valueStyle(row.f267);
            },
            formatter: (row) => {
              return formatMoney(row.f267);
            },
          },
          {
            prop: "f164",
            label: "5日净流入",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return valueStyle(row.f164);
            },
            formatter: (row) => {
              return formatMoney(row.f164);
            },
          },
          {
            prop: "f63",
            label: "集合竞价",
            span: 5,
            component: "text-cell",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
            formatter: (row) => {
              return formatMoney(row.f63);
            },
          },
        ],
      },
      form: {
        f12: [],
      },
      f12Options: [],
    };
  },
  mounted() {
    this.$refs["ft-table"].handDoQuery();
  },
  methods: {
    toDetail(row) {
      this.$refs["base-detail"].show({
        title: row.f14,
        ...row,
      });
    },
    tableFunction(params) {
      const listJson = localStorage.getItem(FOCUS_KEY);
      let list = listJson ? JSON.parse(listJson) : [];
      params.where.f12 = list;
      params["matchKey"] = [
        ...this.options.columns,
        ...this.options.foldColums,
      ].map((item) => item.prop);
      return getStockList(params);
    },
    querySearchAsync(query) {
      if (query !== "") {
        this.loading = true;
        getStockList({
          pageNum: 1,
          pageSize: 10,
          matchKey: ["f12", "f14"],
          where: {
            f14: query || undefined,
          },
        }).then((data) => {
          let list = data.list || [];
          this.f12Options = list.map((item) => {
            return {
              value: item.f12,
              label: item.f14,
            };
          });
        });
      }
    },
    addRow() {
      if (this.form.f12 && this.form.f12.length > 0) {
        this.execAdd(this.form.f12);
        this.dialogVisible = false;
      }
    },
    deleteRow(row) {
      this.$alert(`确认删除${row.f14}?`, "提示", {
        confirmButtonText: "确定",
      }).then(() => {
        const code = row.f12;
        const listJson = localStorage.getItem(FOCUS_KEY);
        let list = listJson ? JSON.parse(listJson) : [];
        list = list.filter((item) => item != code);
        localStorage.setItem(FOCUS_KEY, JSON.stringify(list));
        this.$refs["ft-table"].handDoQuery();
      });
    },
    clearAll() {
      this.$alert(`确定清空?`, "提示", {
        confirmButtonText: "确定",
      }).then(() => {
        localStorage.removeItem(FOCUS_KEY);
        this.$refs["ft-table"].handDoQuery();
      });
    },
    execAdd(codeList) {
      const listJson = localStorage.getItem(FOCUS_KEY);
      let list = listJson ? JSON.parse(listJson) : [];
      list = list.concat(codeList);
      localStorage.setItem(FOCUS_KEY, JSON.stringify(list));
      this.$refs["ft-table"].handDoQuery();
    },
  },
};
</script>
<style lang="less" scoped>
.ft-table {
  /deep/.table-warp {
    border-radius: 0;
  }
}
</style>
