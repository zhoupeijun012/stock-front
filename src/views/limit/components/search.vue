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
    <el-form-item label="日期">
      <el-date-picker
        v-model.trim="row.date"
        placeholder="请选择"
        clearable
        value-format="yyyy-MM-dd"
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
  date: dayjs().format("YYYY-MM-DD"),
};
export default {
  props: {
    row: {
      type: Object,
    },
  },
  data() {
    const last10Days = GET_LAST_DATE(10);
    return {
      last10Days,
      pickerOptions: {
        disabledDate(val) {
          return !last10Days.includes(dayjs(val).format("YYYY-MM-DD"));
        },
      },
    };
  },
  created() {
    this.onReset();
    this.$nextTick(() => {
      this.$parent.handDoQuery();
    });
  },
  methods: {
    onReset() {
      Object.keys(model).forEach((key) => {
        this.$set(this.row, key, model[key]);
      });
      this.$set(this.row,'date',this.last10Days[0]);
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
