<template>
  <div
    class="ft-table"
    v-loading="loading"
    ref="ft-table"
    :default-sort="{ prop: 'f3', order: 'descending' }"
  >
    <div class="search-bar" v-if="options.search">
      <div class="search-filter-warp" :class="{ close: fold }">
        <component
          :is="options.search"
          v-bind="$attrs"
          ref="search"
          :otherSearchRow="otherSearchRow"
          :row="searchRow"
        ></component>
      </div>
      <div class="search-btn-warp">
        <el-button type="text" @click="foldChange">{{
          fold ? "展开" : "收起"
        }}</el-button>
        <el-button type="plain" @click="onReset">重置</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <!-- <capture-icon style="margin-left: 10px; width: 36px; height: 36px" full-dom="#app-content"></capture-icon> -->
        <full-icon
          style="margin-left: 10px; width: 40px; height: 40px"
          full-dom="#app-content"
          v-if="!inContainer"
        ></full-icon>
      </div>
    </div>
    <div class="ft-table-warp" v-height-change="heightChange">
      <el-table
        :data="tableData"
        v-bind="$attrs"
        v-on="$listeners"
        style="width: 100%"
        :height="tableHeight"
        ref="table"
        :row-key="rowKey"
        :expand-row-keys="expandRowKeys"
        @sort-change="sortChange"
        @cell-click="cellClick"
        :header-cell-class-name="handleHeadercellStyle"
        :default-sort="defaultSort"
      >
        <el-table-column
          type="expand"
          width="40px"
          v-if="
            Array.isArray(options.foldColums) && options.foldColums.length > 0
          "
        >
          <template #header>
            <i
              class="el-icon el-icon-arrow-right table-expand"
              :class="{ open: tableExpend }"
              @click="changeExpand(false)"
            ></i>
          </template>
          <template slot-scope="props">
            <column-fold
              :row="props.row"
              :colums="options.foldColums"
            ></column-fold>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          width="60"
          align="center"
          :fixed="
            Array.isArray(options.foldColums) && options.foldColums.length > 0
              ? false
              : 'left'
          "
        >
          <template scope="scope">
            {{ scope.$index + 1 + baseIndex }}
          </template>
        </el-table-column>
        <el-table-column
          v-bind="column"
          v-for="(column, index) in options.columns"
          :key="'column-' + index"
        >
          <template scope="scope">
            <div
              :style="
                cellStyle({
                  column,
                  row: scope.row,
                })
              "
            >
              {{
                column.formatter
                  ? column.formatter(scope.row)
                  : scope.row[column.prop]
              }}
            </div>
          </template>
        </el-table-column>
        <slot></slot>
      </el-table>
    </div>
    <div class="ft-pagination" v-if="showPager">
      <el-pagination
        append-to-body="false"
        :popper-class="popperClass"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        background
        :page-sizes="pageOptions"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import fullIcon from "@/components/full-icon";
import captureIcon from "@/components/capture-icon";
import ColumnFold from "./column-fold.vue";
export default {
  components: { fullIcon, captureIcon, ColumnFold },
  props: {
    requestFunction: {
      type: Function,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
    otherSearchRow: {
      type: Object,
      default: () => {},
    },
    showPager: {
      type: Boolean,
      default: true,
    },
    autoHeight: {
      type: Boolean,
      default: true,
    },
    rowKey: {
      type: String,
      default: "uuid",
    },
    defaultSort: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    baseIndex() {
      return (this.pageNum - 1) * this.pageSize;
    },
    tableHeight() {
      if (this.autoHeight) {
        return this.maxHeight;
      } else {
        return null;
      }
    },
    popperClass() {
      return "pagination-" + parseInt(Math.random() * 1000);
    },
  },
  inject: {
    inContainer: {
      default: false,
    },
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      queryParams: {},
      loading: false,
      fold: true,
      maxHeight: "1000px",
      orderArray: [],
      searchRow: {},
      tableExpend: false,
      expandRowKeys: [],
      pageOptions: [10, 20, 30, 40, 50],
    };
  },
  created() {
    if (this.defaultSort && Object.keys(this.defaultSort).length > 0) {
      this.orderArray.push({
        prop: this.defaultSort.prop,
        order: this.defaultSort.order,
      });
    }
  },
  mounted() {
    this.pageSize = this.calculatePageSize();
  },
  methods: {
    calculatePageSize() {
      const height = this.$refs["ft-table"].clientHeight - 100;
      const pageHeight = 480;
      const pageIndex =
        Math.ceil(height / pageHeight) > 0
          ? Math.ceil(height / pageHeight) - 1
          : 0;
      return this.pageOptions[pageIndex];
    },
    heightChange(height) {
      this.maxHeight = height;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.doQuery();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.doQuery();
    },
    onSubmit() {
      this.doQuery();
    },
    onReset() {
      const searchRef = this.$refs.search;
      searchRef && searchRef.onReset();
      this.orderArray = [];
      this.$refs.table.$el.querySelectorAll(".is-sortable").forEach((item) => {
        // 移除table表头中的排序样式descending和ascending
        item.classList.remove("descending");
        item.classList.remove("ascending");
      });
      this.$nextTick(() => {
        this.doQuery();
      });
    },
    handDoQuery() {
      this.pageNum = 1;
      this.doQuery();
    },
    doQuery() {
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        order: this.orderArray,
        where: this.searchRow,
      };
      const searchParams = this.searchRow;
      const filters = {};
      for (let filterItemKey of Object.keys(searchParams)) {
        if (
          searchParams[filterItemKey] != null &&
          searchParams[filterItemKey] != undefined &&
          searchParams[filterItemKey] !== ""
        ) {
          filters[filterItemKey] = searchParams[filterItemKey];
        }
      }
      params.where = filters;

      this.requestFunction(params)
        .then((res) => {
          const { pageNum, pageSize, total, list } = res;
          this.pageNum = pageNum;
          this.pageSize = pageSize;
          this.total = total;
          this.tableData = list || [];
          this.changeExpand(true);
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    foldChange() {
      this.fold = !this.fold;
    },
    sortChange({ column, prop, order }) {
      if (order) {
        //参与排序
        let flagIsHave = false;
        this.orderArray.forEach((element) => {
          if (element.prop === prop) {
            element.order = order;
            flagIsHave = true;
          }
        });
        if (!flagIsHave) {
          this.orderArray.push({
            prop: prop,
            order: order,
          });
        }
      } else {
        //不参与排序
        this.orderArray = this.orderArray.filter((element) => {
          return element.prop !== prop;
        });
      }

      this.handleCurrentChange(1);
    },
    handleHeadercellStyle({ row, column, rowIndex, columnIndex }) {
      this.orderArray.forEach((element) => {
        if (column.property === element.prop) {
          column.order = element.order;
        }
      });
    },
    cellStyle({ column, row }) {
      const style = column.cellStyle ? column.cellStyle(row) : {};
      return style;
    },
    cellClick(row, column, cell, event) {
      const columns = this.options.columns;
      const findObj = columns.find((item) => item.prop == column.property);
      findObj && findObj.click && findObj.click(row);
    },
    changeExpand(fromInit = false) {
      if (!fromInit) {
        this.tableExpend = !this.tableExpend;
      }
      if (this.tableExpend) {
        this.expandRowKeys = this.tableData.map((item) => item[this.rowKey]);
      } else {
        this.expandRowKeys = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
.ft-table {
  // padding: 10px;
  box-sizing: border-box;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.ft-table-warp {
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  flex: 1;
}
.ft-pagination {
  text-align: right;
  padding: 8px 0;
  height: 48px;
  background: #fff;
  box-sizing: border-box;
  border-top: 1px solid #e3e4e5;
}
.table-expand {
  cursor: pointer;
  &.open {
    transform: rotate(90deg);
  }
}
.search-bar {
  display: flex;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 10px;
  padding: 10px;
  .search-filter-warp {
    flex: 1;
    margin-bottom: -10px;
    &.close {
      height: 43px;
      overflow: hidden;
    }
  }
  /deep/.el-form-item {
    width: 25%;
    margin-right: 0;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
  }
  /deep/.el-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
.search-btn-warp {
  display: flex;
  align-items: flex-start;
}
</style>
