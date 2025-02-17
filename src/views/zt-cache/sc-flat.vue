<template>
  <div class="sc-flat">
    <div
      class="table-cell"
      v-for="(header, index) in tabeleHeader"
      :key="`table-header-` + index"
    >
      <div class="table-heade-title">{{ header.title }}</div>
      <stock-cell
        v-for="(ztCell, index) in header.list"
        :showCloumn="['name', 'lb']"
        :data="ztCell"
        :key="ztCell.c"
      ></stock-cell>
    </div>
  </div>
</template>
<script lang="js">
import stockCell from './stock-cell';
export default {
    components: { stockCell },
    props: {
      tabeleHeader: {
            type:Array,
            default:()=>[]
        },
    }
}
</script>

<style lang="less" scoped>
.sc-flat {
  display: flex;
  flex-direction: row;
  min-height: 100%;

  .table-cell {
    &:last-child {
      border-right: none;
    }
  }

  .table-cell {
    flex: 1;
  }
}

.table-heade-title {
  text-align: center;
  line-height: 28px;
  margin-bottom: 5px;
}
</style>
