<template>
  <div class="ft-card-item" @click="gotoDetail(tableItem)">
    <div class="card-name">
      {{ tableItem.f14 }}
      <span :style="valueStyle(tableItem.f3)" class="card-prec">{{
        formatPrec(tableItem.f3, "%")
      }}</span>
    </div>
    <div class="card-col">
      <div class="card-title">成交额：</div>
      <div class="card-text" style="color: red">
        {{ formatMoney(tableItem.f6) }}
      </div>
    </div>
    <div class="card-col">
      <div class="card-title">流通市值：</div>
      <div class="card-text" style="color: red">
        {{ formatMoney(tableItem.f21) }}
      </div>
    </div>
    <div class="card-col">
      <div class="card-title">924涨幅：</div>
      <div class="card-text" :style="valueStyle(tableItem.f40006)">
        {{ formatPrec(tableItem.f40006, "%") }}
      </div>
    </div>
    <div class="card-col">
      <div class="card-title">205涨幅：</div>
      <div class="card-text" :style="valueStyle(tableItem.f40007)">
        {{ formatPrec(tableItem.f40007, "%") }}
      </div>
    </div>
  </div>
</template>
<script>
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";

export default {
  props: {
    tableItem: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    formatMoney,
    valueStyle,
    formatPrec,
    gotoDetail(row) {
      this.$stockDetail({
        title: row.f14,
        ...row,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.ft-card-item {
  border-radius: 8px;
  background: #fff;
  margin-bottom: 8px;
  position: relative;
  width: 100%;
  padding: 6px 8px;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}
.card-name {
  color: red;
  font-size: 16px;
}
.card-prec {
  font-size: 16px;
  margin-left: 8px;
}
.card-col {
  float: left;
  width: 50%;
  display: flex;
}
.card-title {
  width: 80px;
  text-align-last: justify;
  color: #606266;
}
</style>
