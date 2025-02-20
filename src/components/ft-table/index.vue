<template>
  <div class="ft-table" v-loading="loading">
    <div class="search-bar" v-if="options.search">
      <div class="search-filter-warp" :class="{ close: fold }">
        <component :is="options.search" ref="search"></component>
      </div>
      <div class="search-btn-warp">
        <el-button type="text" @click="foldChange">{{
          fold ? "展开" : "收起"
        }}</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
        <el-button type="plain" @click="onSubmit">查询</el-button>
      </div>
    </div>
    <div class="ft-table-warp" v-height-change="heightChange">
      <el-table
        :data="tableData"
        v-bind="$attrs"
        v-on="$listeners"
        style="width: 100%"
        :height="maxHeight"
        @sort-change="sortChange"
        :header-cell-class-name="handleHeaderCellClass"
      >
        <el-table-column label="序号" width="80" align="center" fixed="left">
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
            {{
              column.formatter
                ? column.formatter(scope.row)
                : scope.row[column.prop]
            }}
          </template>
        </el-table-column>
        <slot></slot>
      </el-table>
    </div>
    <div class="ft-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        background
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import deepmerge from "deepmerge";
export default {
  props: {
    requestFunction: {
      type: Function,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    baseIndex() {
      return (this.pageNum - 1) * this.pageSize;
    },
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      queryParams: {},
      queryCallback: () => {},
      loading: false,
      fold: true,
      maxHeight: "1000px",
      orderArray: [],
    };
  },
  methods: {
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
    query(queryParams, queryCallback) {
      this.queryParams = queryParams;
      this.queryCallback = queryCallback;
      this.doQuery();
    },
    onSubmit() {
      this.doQuery();
    },
    onReset() {
      const searchRef = this.$refs.search;
      searchRef && searchRef.onReset();
      setTimeout(() => {
        this.doQuery();
      }, 0);
    },
    doQuery() {
      this.loading = true;
      const searchRef = this.$refs.search;
      let searchParams = {};
      if (searchRef) {
        searchParams = searchRef.onSubmit() || {};
      }
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orders: this.orderArray,
      };
      params = deepmerge(params, this.queryParams);
      params = deepmerge(params, {
        filters: searchParams,
      });

      const filters = {};
      for (let filterItemKey of Object.keys(params.filters)) {
        if (params.filters[filterItemKey]) {
          filters[filterItemKey] = params.filters[filterItemKey];
        }
      }
      params.filters = filters;

      this.requestFunction(params)
        .then((res) => {
          this.queryCallback && this.queryCallback(res);
          const { pageNum, pageSize, total, list } = res;
          this.pageNum = pageNum;
          this.pageSize = pageSize;
          this.total = total;
          this.tableData = list || [];
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
    handleHeaderCellClass({ row, column, rowIndex, columnIndex }) {
      this.orderArray.forEach((element) => {
        if (column.property === element.prop) {
          column.order = element.order;
        }
      });
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
  }
}
</style>
