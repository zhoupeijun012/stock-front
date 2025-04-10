<template>
  <div class="overview">
    <div class="overview-item">
      <gn-card
        :tableFunction="$api.getConceptList"
        @gotoDetail="
          (row) => {
            this.$conceptDetail({
              title: row.f14,
              ...row,
            });
          }
        "
      ></gn-card>
    </div>
    <div class="overview-item">
      <gn-card
        :tableFunction="$api.getIndustryList"
        @gotoDetail="
          (row) => {
            this.$industryDetail({
              title: row.f14,
              ...row,
            });
          }
        "
      ></gn-card>
    </div>
    <div class="overview-item">
      <gn-card
        :tableFunction="$api.getRegionList"
        @gotoDetail="
          (row) => {
            this.$regionDetail({
              title: row.f14,
              ...row,
            });
          }
        "
      ></gn-card>
    </div>

    <div class="overview-item">
      <etf-card
        :tableFunction="$api.getEtfList"
        :where-params="{
          c1: '0',
        }"
      ></etf-card>
    </div>
    <div class="overview-item">
      <etf-card
        :tableFunction="$api.getEtfList"
        :where-params="{
          c1: '1',
        }"
      ></etf-card>
    </div>
    <div class="overview-item">
      <etf-card :tableFunction="$api.getLofList"></etf-card>
    </div>
    <div class="overview-item">
      <np-card :tableFunction="$api.getNpList"></np-card>
    </div>
    <!-- <div class="overview-item" style="width: 66.66%">
      <limit-card></limit-card>
    </div> -->
  </div>
</template>
<script>
import GnCard from "./components/gn-card.vue";
import EtfCard from "./components/etf-card.vue";
import NpCard from "./components/np-card.vue";
import LimitCard from "./components/limit-card.vue";
export default {
  components: { GnCard, EtfCard, NpCard, LimitCard },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.overview {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background: #fafafa;
  flex-wrap: wrap;
  margin-left: -6px;
  .overview-item {
    width: 33.33%;
    height: 33.33%;
    background: #fff;
    box-sizing: border-box;
    border-bottom: 6px solid #fafafa;
    border-left: 6px solid #fafafa;
  }
}
</style>
