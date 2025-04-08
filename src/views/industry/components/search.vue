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
    <el-form-item label="924涨幅">
      <el-select :popper-append-to-body="false" 
        v-model="row.f40006"
        @change="optionChange('f40006', gainOptions)"
        clearable
      >
        <el-option
          v-for="(typeItem, index) in gainOptions"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="205涨幅">
      <el-select :popper-append-to-body="false" 
        v-model="row.f40007"
        @change="optionChange('f40007', gainOptions)"
        clearable
      >
        <el-option
          v-for="(typeItem, index) in gainOptions"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="多头排列">
      <el-select :popper-append-to-body="false" 
        v-model="row.f40008"
        @change="optionChange('f40008', dayOptions)"
        clearable
      >
        <el-option
          v-for="(typeItem, index) in dayOptions"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排列涨幅">
      <el-select :popper-append-to-body="false" 
        v-model="row.f40009"
        @change="optionChange('f40009', gainOptions)"
        clearable
      >
        <el-option
          v-for="(typeItem, index) in gainOptions"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="60日均线">
      <el-select :popper-append-to-body="false" 
        v-model="row.f40010"
        @change="optionChange('f40010', dayOptions)"
        clearable
      >
        <el-option
          v-for="(typeItem, index) in dayOptions"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="均线涨幅">
      <el-select :popper-append-to-body="false" 
        v-model="row.f40011"
        @change="optionChange('f40011', gainOptions)"
        clearable
      >
        <el-option
          v-for="(typeItem, index) in gainOptions"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="流入天数">
      <el-select :popper-append-to-body="false" 
        v-model="row.f50004"
        @change="optionChange('f50004', dayOptions)"
        clearable
      >
        <el-option
          v-for="(typeItem, index) in dayOptions"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="流通市值">
      <el-select :popper-append-to-body="false" 
        v-model="row.f21"
        @change="optionChange('f21', f21Options)"
        clearable
      >
        <el-option
          v-for="(typeItem, index) in f21Options"
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
  f40006: "",
  f40006_ext: null,
  f40007: "",
  f40007_ext: null,
  f40008: "",
  f40008_ext: null,
  f40009: "",
  f40009_ext: null,
  f40010: "",
  f40010_ext: null,
  f40011: "",
  f40011_ext: null,
  f50004: "",
  f50004_ext: null,
  f21: "",
  f21_ext: null,
};
export default {
  props: {
    row: {
      type: Object,
    },
  },
  data() {
    return {
      f21Options: [
        { label: "小于20亿", value: "1", range: [0, 20e8] },
        { label: "20亿-40亿", value: "2", range: [20e8, 40e8] },
        { label: "40亿-100亿", value: "3", range: [40e8, 100e8] },
        { label: "100亿-200亿", value: "4", range: [100e8, 200e8] },
        { label: "200亿-500亿", value: "5", range: [200e8, 500e8] },
        { label: "大于500亿", value: "6", range: [500e8] },
      ],
      dayOptions: [
        { label: "小于5天", value: "1", range: [0, 5] },
        { label: "6天-10天", value: "2", range: [5, 10] },
        { label: "10天-20天", value: "3", range: [10, 20] },
        { label: "大于20天", value: "4", range: [20] },
      ],
      gainOptions: [
        { label: "小于5%", value: "1", range: [0, 500] },
        { label: "5%-10%", value: "2", range: [500, 1000] },
        { label: "10%-20%", value: "3", range: [1000, 2000] },
        { label: "20%-40%", value: "4", range: [2000, 4000] },
        { label: "40%-60%", value: "5", range: [4000, 6000] },
        { label: "60%-100%", value: "6", range: [6000, 10000] },
        { label: "大于100%", value: "7", range: [10000] },
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
    optionChange(key, options) {
      if (this.row[key]) {
        const findObj = options.find((item) => item.value == this.row[key]);
        this.$set(this.row, `${key}_ext`, findObj.range);
      } else {
        this.$set(this.row, `${key}_ext`, []);
      }

      this.change();
    },
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
