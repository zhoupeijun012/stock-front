<template>
  <div class="ft-table">
    <div class="search-bar" v-if="$attrs.options.search">
      <div class="search-filter-warp" :class="{ close: fold }">
        <component
          :is="$attrs.options.search"
          v-bind="$attrs"
          ref="search"
          :otherSearchRow="otherSearchRow"
          :row="searchRow"
        ></component>
      </div>
      <div class="search-btn-warp">
        <el-button type="text" @click="foldChange">{{
          fold ? "展开" : "收起"
        }}</el-button>
        <el-button type="plain" @click="onReset">重置</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <switch-icon
          v-if="$attrs.cardFunction"
          open-title="列表"
          :open="showTypeDsc"
          :open-icon="require('@/assets/列表.png')"
          close-title="平铺"
          :close-icon="require('@/assets/平铺.png')"
          @open="open"
          @close="close"
          style="margin-left: 10px; width: 40px; height: 40px"
        ></switch-icon>
        <!-- <capture-icon style="margin-left: 10px; width: 36px; height: 36px" full-dom="#app-content"></capture-icon> -->
        <!-- <full-icon
          style="margin-left: 10px; width: 40px; height: 40px"
          full-dom="#app-content"
          v-if="!inContainer"
        ></full-icon> -->
      </div>
    </div>
    <template v-if="showType == 'table'">
      <ft-table
        v-bind="$attrs"
        v-on="$listeners"
        ref="ft-ref"
        :searchRow="searchRow"
        class="ft-table-warp"
      >
        <slot></slot>
      </ft-table>
    </template>
    <template v-if="showType == 'card'">
      <ft-card
        v-bind="$attrs"
        v-on="$listeners"
        ref="ft-ref"
        :searchRow="searchRow"
        class="ft-table-warp"
      ></ft-card>
    </template>
  </div>
</template>
<script>
import FtTable from "./ft-table.vue";
import FtCard from "./ft-card.vue";
import SwitchIcon from "@/components/switch-icon/index.vue";
export default {
  components: {
    FtTable,
    FtCard,
    SwitchIcon,
  },
  props: {
    otherSearchRow: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      fold: true,
      searchRow: {},
      showType: "table",
    };
  },
  computed: {
    showTypeDsc() {
      return this.showType == "table";
    },
  },
  methods: {
    open() {
      this.showType = "table";
      this.$nextTick(() => {
        this.handDoQuery();
      });
    },
    close() {
      this.showType = "card";
      this.$nextTick(() => {
        this.handDoQuery();
      });
    },
    onSubmit() {
      this.$refs["ft-ref"] && this.$refs["ft-ref"].doQuery();
    },
    onReset() {
      const searchRef = this.$refs.search;
      searchRef && searchRef.onReset();
      this.$refs["ft-ref"] && this.$refs["ft-ref"].onReset();
    },
    handDoQuery() {
      this.$refs["ft-ref"] && this.$refs["ft-ref"].handDoQuery();
    },

    foldChange() {
      this.fold = !this.fold;
    },
    refresh(tableData) {
      this.$refs["ft-ref"] && (this.$refs["ft-ref"].tableData = tableData);
    },
  },
};
</script>

<style lang="less" scoped>
.ft-table {
  // padding: 10px;
  box-sizing: border-box;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.ft-table-warp {
  border-radius: 8px;
  overflow: hidden;
  // background: #fff;
  flex: 1;
}

.search-bar {
  display: flex;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 10px;
  padding: 10px;
  .search-filter-warp {
    flex: 1;
    margin-bottom: -10px;
    &.close {
      height: 43px;
      overflow: hidden;
    }
  }
  /deep/.el-form-item {
    width: 25%;
    margin-right: 0;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
  }
  /deep/.el-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
.search-btn-warp {
  display: flex;
  align-items: flex-start;
}
</style>
