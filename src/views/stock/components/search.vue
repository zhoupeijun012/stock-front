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
    <!-- <el-form-item label="股票代码">
      <el-input
        v-model.trim="row.f12"
        placeholder="请输入"
        clearable
        style="width: 100%"
        @clear="change"
      />
    </el-form-item> -->
    <el-form-item label="行业">
      <lazy-select
        style="width: 100%"
        v-model.trim="row.f100"
        :defaultAttrs="{
          matchKey: ['f14', 'f3'],
          order: [{ prop: 'f3', order: 'descending' }],
        }"
        matchKey="f14"
        :tableFunction="getIndustryList"
        @change="change"
        placeholder="请输入"
        multiple
        filterable
        collapse-tags
        remote
        reserve-keyword
      >
        <template v-slot:default="{ list }">
          <el-option
            v-for="(item, i) in list"
            :key="'opt-code' + i"
            :label="item.f14"
            :value="item.f14"
          >
            <div class="search-slot">
              <div class="left">{{ item.f14 }}</div>
              <div
                class="right"
                :class="item.f3 > 0 ? 'red' : item.f3 == 0 ? 'normal' : 'blue'"
              >
                {{ Math.ceil(item.f3 / 100) }}%
              </div>
            </div>
          </el-option>
        </template>
      </lazy-select>
    </el-form-item>
    <el-form-item label="概念">
      <lazy-select
        style="width: 100%"
        @change="change"
        v-model.trim="row.f103"
        ref="f103"
        collapse-tags
        :defaultAttrs="{
          matchKey: ['f14', 'f3'],
          order: [{ prop: 'f3', order: 'descending' }],
        }"
        matchKey="f14"
        :tableFunction="getConceptList"
        placeholder="请输入"
        multiple
        filterable
        remote
        reserve-keyword
      >
        <template v-slot:default="{ list }">
          <el-option
            v-for="(item, i) in list"
            :key="'opt-code' + i"
            :label="item.f14"
            :value="item.f14"
          >
            <div class="search-slot">
              <div class="left">{{ item.f14 }}</div>
              <div
                class="right"
                :class="item.f3 > 0 ? 'red' : item.f3 == 0 ? 'normal' : 'blue'"
              >
                {{ Math.ceil(item.f3 / 100) }}%
              </div>
            </div>
          </el-option>
        </template></lazy-select
      >
    </el-form-item>
    <el-form-item label="地区">
      <lazy-select
        style="width: 100%"
        @change="change"
        v-model.trim="row.f102"
        collapse-tags
        :defaultAttrs="{
          matchKey: ['f14', 'f3'],
          order: [{ prop: 'f3', order: 'descending' }],
        }"
        matchKey="f14"
        :tableFunction="getRegionList"
        placeholder="请输入"
        multiple
        filterable
        remote
        reserve-keyword
      >
        <template v-slot:default="{ list }">
          <el-option
            v-for="(item, i) in list"
            :key="'opt-code' + i"
            :label="item.f14"
            :value="item.f14"
          >
            <div class="search-slot">
              <div class="left">{{ item.f14 }}</div>
              <div
                class="right"
                :class="item.f3 > 0 ? 'red' : item.f3 == 0 ? 'normal' : 'blue'"
              >
                {{ Math.ceil(item.f3 / 100) }}%
              </div>
            </div>
          </el-option>
        </template></lazy-select
      >
    </el-form-item>
    <el-form-item label="924涨幅">
      <el-select
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
    <el-form-item label="多头排列">
      <el-select
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
      <el-select
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
      <el-select
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
      <el-select
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
    <el-form-item label="趋势天数">
      <el-select
        v-model="row.f40012"
        @change="optionChange('f40012', dayOptions)"
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
    <el-form-item label="流入天数">
      <el-select
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
      <el-select
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
    <!-- <el-form-item label="是否亏损">
      <el-select v-model="row.f9" @change="change" clearable>
        <el-option
          v-for="(typeItem, index) in switchOptions"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item> -->
    <!-- <el-form-item label="巨额成交">
      <el-select v-model="row.f40003" @change="change" clearable>
        <el-option
          v-for="(typeItem, index) in switchOptions"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="金叉天数">
      <el-select
        v-model="row.f40014"
        @change="optionChange('f40014', crossOptions)"
        clearable
      >
        <el-option
          v-for="(typeItem, index) in crossOptions"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="控盘程度">
      <el-select
        v-model="row.f40016"
        @change="optionChange('f40016', f40016Options)"
        clearable
      >
        <el-option
          v-for="(typeItem, index) in f40016Options"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="当日涨幅">
      <el-select
        v-model="row.f3"
        @change="optionChange('f3', f3Options)"
        clearable
      >
        <el-option
          v-for="(typeItem, index) in f3Options"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="上市地区">
      <el-select
        v-model="row.f6666"
        @change="optionChange('f6666', f6666Options)"
        clearable
      >
        <el-option
          v-for="(typeItem, index) in f6666Options"
          :key="'type-item-' + index"
          :value="typeItem.value"
          :label="typeItem.label"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import LazySelect from "@/components/lazy-select";
import { getIndustryList, getConceptList, getRegionList } from "@/api/index";

const model = {
  f14: "",
  f12: "",
  f9: "",
  f6666: "",
  f40003: "",
  f6666_ext: null,
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
  f40012: "",
  f40012_ext: null,
  f50004: "",
  f50004_ext: null,

  f40014: "",
  f40014_ext: null,

  f40016: "",
  f40016_ext: null,

  f3: "",
  f3_ext: null,

  f21: "",
  f21_ext: null,
  f23: "",
  f100: [],
  f103: [],
  f102: [],
};
export default {
  components: {
    LazySelect,
  },
  props: {
    row: {
      type: Object,
    },
  },
  data() {
    return {
      f6666Options: [
        { label: "主板", value: "0", range: ["00", "60"] },
        { label: "创业", value: "1", range: ["300"] },
        { label: "科创", value: "2", range: ["68"] },
        { label: "北证", value: "3", range: ["8"] },
      ],
      switchOptions: [
        { label: "是", value: "1" },
        { label: "否", value: "0" },
      ],
      f21Options: [
        { label: "小于20亿", value: "1", range: [0, 20e8] },
        { label: "20亿-40亿", value: "2", range: [20e8, 40e8] },
        { label: "小于40亿", value: "3", range: [0, 40e8] },
        { label: "40亿-100亿", value: "4", range: [40e8, 100e8] },
        { label: "100亿-200亿", value: "5", range: [100e8, 200e8] },
        { label: "200亿-500亿", value: "6", range: [200e8, 500e8] },
        { label: "大于500亿", value: "7", range: [500e8] },
      ],
      dayOptions: [
        { label: "小于5天", value: "1", range: [0, 5] },
        { label: "6天-10天", value: "2", range: [5, 10] },
        { label: "小10天", value: "3", range: [0, 10] },
        { label: "10天-20天", value: "4", range: [10, 20] },
        { label: "大于20天", value: "5", range: [20] },
      ],
      gainOptions: [
        { label: "小于5%", value: "1", range: [0, 500] },
        { label: "5%-10%", value: "2", range: [500, 1000] },
        { label: "10%-20%", value: "3", range: [1000, 2000] },
        { label: "小于20%", value: "4", range: [0, 2000] },
        { label: "20%-40%", value: "5", range: [2000, 4000] },
        { label: "40%-60%", value: "6", range: [4000, 6000] },
        { label: "60%-100%", value: "7", range: [6000, 10000] },
        { label: "大于100%", value: "8", range: [10000] },
      ],
      crossOptions: [
        { label: "大于1天", value: "-1", range: [0] },
        { label: "1天", value: "1", range: [0, 1] },
        { label: "2天", value: "2", range: [1, 2] },
        { label: "3-4天", value: "3", range: [2, 4] },
        { label: "小于5天", value: "4", range: [0, 5] },
        { label: "5-10天", value: "5", range: [5, 10] },
      ],
      f3Options: [
        { label: "小于2%", value: "1", range: [0, 200] },
        { label: "2-4%", value: "2", range: [200, 400] },
        { label: "小于4%", value: "3", range: [0, 400] },
        { label: "4-6%", value: "4", range: [400, 600] },
        { label: "小于6%", value: "5", range: [400, 600] },
        { label: "大于6%", value: "6", range: [600] },
      ],
      f40016Options: [
        { label: "小于50", value: "1", range: [0, 50] },
        { label: "50-100", value: "1", range: [50, 100] },
        { label: "大于80", value: "3", range: [80] },
        { label: "大于100", value: "4", range: [100] },
      ],
    };
  },
  mounted() {
    this.onReset();
    this.$nextTick(() => {
      this.$parent.handDoQuery();
    });
  },
  methods: {
    getIndustryList,
    getConceptList,
    getRegionList,
    change() {
      this.$parent.handDoQuery();
    },
    optionChange(key, options) {
      if (this.row[key]) {
        const findObj = options.find((item) => item.value == this.row[key]);
        this.$set(this.row, `${key}_ext`, findObj.range);
      } else {
        this.$set(this.row, `${key}_ext`, []);
      }

      this.change();
    },
    onReset() {
      Object.keys(model).forEach((key) => {
        this.$set(this.row, key, model[key]);
      });
      const otherSearchRow = this.$attrs.otherSearchRow || {};
      if (otherSearchRow.f103) {
        this.$set(this.row, "f103", otherSearchRow.f103);
      }
      if (otherSearchRow.f100) {
        this.$set(this.row, "f100", otherSearchRow.f100);
      }
      if (otherSearchRow.f102) {
        this.$set(this.row, "f102", otherSearchRow.f102);
      }
      if (otherSearchRow.f14_ext) {
        this.$set(this.row, "f14", otherSearchRow.f14_ext);
      }
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
.search-slot {
  display: flex;
  justify-content: space-between;
  .left {
  }
  .right {
  }
}
</style>

<style lang="less" scoped>
.search-slot {
  margin: 0 -20px 0 -10px;
  .red {
    color: #f00;
  }
  .blue {
    color: blue;
  }
  .normal {
    color: #e3e4e5;
  }
}
</style>
