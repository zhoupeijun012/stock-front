<template>
  <div class="home">
    <ft-table :tableFunction="tableFunction" :options="options" ref="ft-table">
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template scope="scope">
          <el-button
            type="text"
            @click="handleRetry(scope.row)"
            v-if="scope.row.retryCount >= 3"
            >重试</el-button
          >
        </template>
      </el-table-column>
    </ft-table>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getQueueList, taskRetry } from "@/api/index";
export default {
  components: {
    FtTable,
  },
  data() {
    return {
      loading: false,
      options: {
        search: () => import(/* webpackChunkName:"stock" */"./components/search.vue"),
        defaultSort: { prop: "taskLevel", order: "ascending" },
        columns: [
          {
            prop: "taskLevel",
            label: "优先级",
            width: "90px",
            sortable: "custom",
            showOverflowTooltip: true,
          },
          {
            prop: "taskName",
            label: "任务名称",
            showOverflowTooltip: true,
          },

          {
            prop: "modelName",
            label: "模型名称",
            showOverflowTooltip: true,
          },
          {
            prop: "modelFunc",
            label: "调用方法",
            showOverflowTooltip: true,
          },
          {
            prop: "taskParams",
            label: "使用参数",
            showOverflowTooltip: true,
          },

          {
            prop: "message",
            label: "错误原因",
            showOverflowTooltip: true,
          },
          {
            prop: "retryCount",
            label: "调用次数",
            align: "center",
            showOverflowTooltip: true,
          },
          {
            prop: "needRetry",
            label: "是否重试",
            align: "center",
            formatter: (row) => {
              return row.needRetry == "1" ? "是" : "否";
            },
            showOverflowTooltip: true,
          },
        ],
      },
    };
  },
  methods: {
    tableFunction(params) {
      params["matchKey"] = this.options.columns.map((item) => item.prop);
      return getQueueList(params);
    },
    handleRetry(row) {
      const { uuid } = row;
      this.$confirm("确定重试?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          taskRetry({
            uuid,
          }).then(() => {
            this.$message({
              type: "success",
              message: "重试提交成功!",
            });
            this.$set(row, "retryCount", "1");
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
