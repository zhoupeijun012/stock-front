<template>
  <div class="home">
    <ft-table
      :requestFunction="requestFunction"
      :options="options"
      ref="ft-table"
    >
    </ft-table>
  </div>
</template>

<script>
import FtTable from "@/components/ft-table";
import { getTaskList } from "@/api/index";
export default {
  components: {
    FtTable,
  },
  data() {
    return {
      loading: false,
      options: {
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
            label: "重试次数",
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
  mounted() {
    this.$refs["ft-table"].doQuery();
  },
  methods: {
    requestFunction(params) {
      params["matchKey"] = this.options.columns.map((item) => item.prop);
      return getTaskList(params);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
