<template>
  <div class="stock-cell">
    <div class="name" v-if="showCloumn.includes('name')">
      {{ data.n }}
    </div>
    <div class="lb" v-if="showCloumn.includes('lb')">
      {{ (data.ylbc || data.lbc) <= 1 ? "首板" : `${(data.ylbc || data.lbc) }连板` }}
    </div>
    <div
      class="prec"
      :style="{
        color: data.zdp > 0 ? '#f00' : data.zdp == 0 ? '#000' : 'green',
      }"
      v-if="showCloumn.includes('prec')"
    >
      {{ parseInt(data.zdp * 100) / 100 }}%
    </div>
  </div>
</template>
<script lang="js">
export default {
    props: {
        data: Object,
        showCloumn: {
            type: Array,
            default:()=>['name','lb','prec']
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.stock-cell {
  display: flex;
  border: 1px solid #e3e4e5;
  width: calc(25% - 22px);
  float: left;
  font-size: 14px;
  line-height: 28px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 4px;
  cursor: pointer;
  margin: 5px;
  .name {
    width: 60px;
  }
  .lb {
    margin-left: 4px;
    width: 50px;
  }
  .prec {
    margin-left: 4px;
  }
}
</style>
