<template>
  <el-form
    :inline="true"
    label-width="80px"
    :model="row"
    class="demo-form-inline"
    @keyup.enter.native="change"
  >
    <el-form-item label="股票名称">
      <el-input
        v-model.trim="row.f14"
        placeholder="请输入"
        clearable
        style="width: 100%"
        @clear="change"
      />
    </el-form-item>
    <el-form-item label="股票代码">
      <el-input
        v-model.trim="row.f12"
        placeholder="请输入"
        clearable
        style="width: 100%"
        @clear="change"
      />
    </el-form-item>
    <el-form-item label="K线类型">
      <el-select :popper-append-to-body="false"  v-model="row.f40001" @change="change">
        <el-option v-for="(typeItem,index) in typeOptions" :key="'type-item-' + index" :value="typeItem.value" :label="typeItem.label"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
const model = {
  f14: "",
  f12: "",
  f40001: "day",
};
export default {
  props: {
    row: {
      type: Object,
    },
  },
  data() {
    return {
      typeOptions: [
        { label: "月K", value: "mon" },
        { label: "周K", value: "week" },
        { label: "日K", value: "day" },
        { label: "5分", value: "5" },
        { label: "15分", value: "15" },
        { label: "30分", value: "30" },
        { label: "60分", value: "60" },
      ],
    };
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
