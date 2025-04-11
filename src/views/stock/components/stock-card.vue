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
    <k-line-mini :lines="lines"></k-line-mini>
  </div>
</template>
<script>
import KLineMini from "@/views/k-line/components/k-line-mini.vue";
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
import dayjs from "dayjs";
export default {
  components: { KLineMini },
  props: {
    tableItem: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    lines() {
      const f40002 = JSON.parse(this.tableItem.f40002 || "[]");
      let firstItem = f40002[f40002.length - 1];
      if (firstItem && firstItem.split(',')[0] != dayjs().format("YYYY-MM-DD")) {
        // 时间/开/收/最高/最低/成交量/成交额/震幅/涨跌幅/涨跌额/换手率
        const { f17, f2, f15, f16, f5, f6, f7, f3, f4, f8 } = this.tableItem;
        const arr = [
          dayjs().format("YYYY-MM-DD"),
          f17/100,
          f2/100,
          f15/100,
          f16/100,
          f5,
          f6,
          f7/100,
          f3/100,
          f4/100,
          f8/100,
        ];
        f40002.push(arr.join(","));
      }
      return f40002;
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
