<template>
  <div class="zt-table" :style="tableStyle">
    <div
      class="split-line"
      v-for="(item, index) in tableHeader"
      :key="'split-line-' + index"
      :style="{
        left: `${xPos(item) * 100}%`,
      }"
    >
      <span class="split-time">{{ getFormatTime(item, ":") }}</span>
    </div>
    <div
      class="table-row"
      v-for="(item, index) in tableData"
      :key="'row-' + index"
      :style="{
        left: `${xPos(item['首次封板时间']) * 100}%`,
        top: `${yPos(index)}px`
      }"
    >
      {{ item["名称"] }}
    </div>
  </div>
</template>
<script lang="js">
import { getZT } from '@/api/index.js';
import { xPos,getFormatTime } from '@/utils/tool.js';
export default {
    data() {
        return {
            tableHeader:[
                '090000',
                '091500',
                '093000',
                '100000',
                '103000',
                '110000',
                '113000',
                '133000',
                '140000',
                '143000',
                '150000',
                '153000'
            ],
            tableData: []
        }
    },
    computed: {
        rowHeight(){
            return 30
        },
        tableHeight(){
            return this.tableData.length * this.rowHeight + 60
        },
        tableStyle() {
            return {
                height: this.tableHeight + 'px'
            }
        }
    },
    mounted() {
        getZT().then((res)=>{
            console.log(res);
            this.tableData = res.data.data.list;
        })
    },
    methods: {
        xPos,
        getFormatTime,
        yPos(index) {
          return this.rowHeight *index
        }
    },
}
</script>

<style lang="less" scoped>
.zt-table {
  position: relative;
  padding: 30px 0;
  box-sizing: border-box;
  width: 100%;
}
.split-line {
  position: absolute;
  top: 30px;
  height: calc(100% - 60px);
  border-left: 1px dashed #e3e4e5;
  .split-time {
    position: absolute;
    top: -30px;
    left: 0;
    transform: translateX(-50%);
  }
}
.table-row {
    height: 30px;
    line-height: 30px;
    position: absolute;
    width: 10%;
    border: 1px solid #e3e4e5;
}
</style>
