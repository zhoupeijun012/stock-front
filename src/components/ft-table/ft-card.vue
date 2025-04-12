<template>
  <el-scrollbar class="scrollbar-wrapper" ref="ft-card">
    <div
      class="infinite-list"
      v-infinite-scroll="onLoad"
      :infinite-scroll-disabled="disabled"
      :infinite-scroll-delay="300"
      :infinite-scroll-immediate="false"
    >
      <el-row :gutter="8">
        <el-col
          :span="6"
          v-for="(tableItem, index) in tableData"
          :key="'card-item-' + index"
        >
          <component
            :is="options.cardComponent"
            :tableItem="tableItem"
          ></component>
        </el-col>
      </el-row>
      <p v-if="loading" class="tip-text">加载中...</p>
      <p v-if="finished" class="tip-text">没有更多了</p>
      <p v-if="error" class="tip-text" @click="retry" style="cursor: pointer">
        网络错误，请点击重试
      </p>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  props: {
    cardFunction: {
      type: Function,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
    searchRow: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      error: false,
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      pageOptions: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    };
  },
  computed: {
    disabled() {
      return this.loading || this.finished;
    },
  },
  mounted() {
    this.pageSize = this.calculatePageSize();
  },
  methods: {
    calculatePageSize() {
      const height = this.$refs["ft-card"].$el.clientHeight;
      const pageHeight = 200;
      const pageIndex =
        Math.ceil(height / pageHeight) > 0
          ? Math.ceil(height / pageHeight) - 1
          : 0;
      return this.pageOptions[pageIndex];
    },
    onLoad() {
      if (this.loading || this.finished || this.error) {
        return;
      }
      this.doQuery(this.pageNum + 1);
    },
    retry() {
      this.doQuery(this.pageNum);
    },
    doQuery(pageNum = 1) {
      this.loading = true;
      this.error = false;
      let params = {
        pageNum: pageNum,
        pageSize: this.pageSize,
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
      this.cardFunction(params)
        .then((res) => {
          const { pageNum, pageSize, total, list, pages } = res;
          this.pageNum = pageNum;
          this.pageSize = pageSize;
          this.total = total;
          if (pageNum <= 1) {
            this.tableData = list || [];
          } else {
            this.tableData = this.tableData.concat(list || []);
          }
          if (this.pageNum >= pages) {
            this.finished = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handDoQuery() {
      this.pageNum = 1;
      this.doQuery();
    },
    onReset() {
      this.tableData = [];
      this.$nextTick(() => {
        this.handDoQuery();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.scrollbar-wrapper {
  height: 100%;
  // background: #fff;
  /deep/.el-scrollbar__wrap {
    overflow: hidden;
    overflow-y: scroll;
    scrollbar-gutter: stable;
    &::-webkit-scrollbar {
      width: 0; /* Chrome/Safari */
      background: transparent;
    }
  }
  /deep/.el-scrollbar__bar {
    display: none;
  }
}
.tip-text {
  line-height: 30px;
  text-align: center;
  color: #ccc;
  font-size: 14px;
  user-select: none;
}
</style>
