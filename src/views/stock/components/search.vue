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
    <el-form-item label="行业">
      <lazy-select
        style="width: 100%"
        v-model.trim="row.f100"
        :defaultAttrs="{
          matchKey: ['f14', 'f3'],
          order: [{ prop: 'f3', order: 'descending' }],
        }"
        matchKey="f14"
        :requestFunction="getIndustryList"
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
        :requestFunction="getConceptList"
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
        :requestFunction="getRegionList"
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
    <el-form-item label="上市地区">
      <el-select v-model="row.f6666" @change="change" clearable>
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
  f6666: "",
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
        { label: "主板", value: "0" },
        { label: "创业", value: "1" },
        { label: "科创", value: "2" },
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
