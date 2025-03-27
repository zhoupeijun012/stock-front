<template>
  <el-form
    :inline="true"
    label-width="80px"
    :model="row"
    class="demo-form-inline"
    @keyup.enter.native="change"
  >
    <el-form-item label="地区名称">
      <el-input
        v-model.trim="row.f14"
        placeholder="请输入"
        clearable
        style="width: 100%"
        @clear="change"
      />
    </el-form-item>
    <el-form-item label="地区代码">
      <el-input
        v-model.trim="row.f12"
        placeholder="请输入"
        clearable
        style="width: 100%"
        @clear="change"
      />
    </el-form-item>
    <el-form-item label="多头排列">
      <el-select v-model="row.f40008" @change="change" clearable>
        <el-option
          v-for="(typeItem, index) in switchOptions"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="60日均线">
      <el-select v-model="row.f40010" @change="change" clearable>
        <el-option
          v-for="(typeItem, index) in switchOptions"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
const model = {
  f14: "",
  f12: "",
  f40008: "",
  f40010: "",
};
export default {
  props: {
    row: {
      type: Object,
    },
  },
  data() {
    return {
      switchOptions: [
        { label: "是", value: "1" },
        { label: "否", value: "0" },
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
