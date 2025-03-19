<template>
  <el-form
    :inline="true"
    label-width="80px"
    :model="row"
    class="demo-form-inline"
    @keyup.enter.native="change"
  >
    <el-form-item label="行业名称">
      <el-input
        v-model.trim="row.f14"
        placeholder="请输入"
        clearable
        style="width: 100%"
        @clear="change"
      />
    </el-form-item>
    <el-form-item label="行业代码">
      <el-input
        v-model.trim="row.f12"
        placeholder="请输入"
        clearable
        style="width: 100%"
        @clear="change"
      />
    </el-form-item>
  </el-form>
</template>

<script>
const model = {
  f14: "",
  f12: "",
};
export default {
  props: {
    row: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  created() {
    this.onReset();
    this.$nextTick(() => {
      this.$parent.handDoQuery();
    });
  },
  methods: {
    change() {
      this.$parent.handDoQuery();
    },
    onReset() {
      Object.keys(model).forEach((key) => {
        this.$set(this.row, key, model[key]);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pagination-block {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
</style>
