<template>
  <div v-loading="loading" ref="ft-table" class="table-warp">
    <div class="el-table-warp" v-height-change="heightChange">
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
        :default-sort="options.defaultSort"
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
          show-overflow-tooltip
        >
          <template scope="scope">
            <div
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
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
      <div class="page-info" v-if="updateTime">更新时间: {{ updateTime }}</div>
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
// import captureIcon from "@/components/capture-icon";
import ColumnFold from "./column-fold.vue";
import dayjs from "dayjs";
export default {
  components: { fullIcon, ColumnFold },
  props: {
    tableFunction: {
      type: Function,
      default: () => {},
    },
    options: {
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
    searchRow: {
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
    updateTime() {
      if (this.tableData.length > 0) {
        let fixedStr = this.tableData[0].updatedAt.split('.')[0];
        return dayjs(fixedStr).format("YYYY-MM-DD HH:mm:ss");
      }
      return "";
    },
  },
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      maxHeight: "1000px",
      orderArray: [],
      tableExpend: false,
      expandRowKeys: [],
      pageOptions: [10, 20, 30, 40, 50],
    };
  },
  created() {
    if (
      this.options.defaultSort &&
      Object.keys(this.options.defaultSort).length > 0
    ) {
      this.orderArray.push({
        prop: this.options.defaultSort.prop,
        order: this.options.defaultSort.order,
      });
    }
  },
  mounted() {
    this.pageSize = this.calculatePageSize();
  },
  methods: {
    calculatePageSize() {
      const height = this.$refs["ft-table"].clientHeight - 150;
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

      this.tableFunction(params)
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
    handDoQuery() {
      this.pageNum = 1;
      this.doQuery();
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
    onReset() {
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
  },
};
</script>
<style lang="less" scoped>
.table-warp {
  height: 100%;
  position: relative;
}
.el-table-warp {
  height: calc(100% - 48px);
}
.page-info {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #606266;
}

.ft-pagination {
  text-align: right;
  padding: 8px;
  height: 48px;
  background: #fff;
  box-sizing: border-box;
  border-top: 1px solid #e3e4e5;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.table-expand {
  cursor: pointer;
  &.open {
    transform: rotate(90deg);
  }
}
</style>
