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
      />
    </el-form-item>
    <el-form-item label="股票代码">
      <el-input
        v-model.trim="row.f12"
        placeholder="请输入"
        clearable
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker
        v-model.trim="row.date"
        placeholder="请选择"
        clearable
        value-format="yyyyMMdd"
        style="width: 100%"
        :picker-options="pickerOptions"
        @change="change"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import dayjs from "dayjs";
import { GET_LAST_DATE } from "@/utils/tool";
const model = {
  f14: "",
  f12: "",
  date: dayjs().format("YYYYMMDD"),
};
export default {
  props: {
    row: {
      type: Object,
    },
  },
  data() {
    const last20Days = GET_LAST_DATE(20);
    return {
      last20Days,
      pickerOptions: {
        disabledDate(val) {
          return !last20Days.includes(dayjs(val).format("YYYYMMDD"));
        },
      },
    };
  },
  created() {
    this.onReset();
    this.$nextTick(() => {
      this.$parent.doQuery();
    });
  },
  methods: {
    onReset() {
      Object.keys(model).forEach((key) => {
        this.$set(this.row, key, model[key]);
      });
      this.$set(this.row,'date',this.last20Days[0]);
    },
    change() {
      this.$parent.onSubmit();
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
