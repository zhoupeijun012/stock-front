<template>
  <div class="ft-table" v-loading="loading">
    <div class="search-bar" v-if="options.search">
        <component :is="options.search"></component>
    </div>
    <div class="ft-table-warp">
      <el-table :data="tableData" v-bind="$attrs" style="width: 100%">
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
      loading: false
    };
  },
  methods: {
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
    doQuery() {
      this.loading = true;
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.queryParams,
      };
      this.requestFunction(params).then((res) => {
        this.queryCallback && this.queryCallback(res);
        const { pageNum, pageSize, total, list, template } = res;
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.total = total;
        this.tableData = list || [];
      }).finally(()=>{
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ft-table {
  padding: 10px;
  box-sizing: border-box;
}
.ft-table-warp {
}
.ft-pagination {
  text-align: right;
  padding: 8px 0;
}
</style>
