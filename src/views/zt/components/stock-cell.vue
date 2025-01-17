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
  width: 100%;
  float: left;
  font-size: 14px;
  line-height: 28px;
  box-sizing: border-box;
  cursor: pointer;
  margin-top: 2px;
  justify-content: center;
  border: 1px solid #e3e4e5;
  border-radius: 4px;
  .name {
    width: 60px;
    color: #003398;
  }
  .lb {
    margin-left: 4px;
    width: 50px;
    color: #ff0000;
  }
  .prec {
    margin-left: 4px;
  }
}
</style>
