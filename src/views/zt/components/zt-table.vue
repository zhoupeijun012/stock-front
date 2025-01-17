<template>
  <div class="zt-table">
    <template v-if="type == 'flat'">
      <div class="table-cell" v-for="(header, index) in tabeleHeader" :key="`table-header-` + index">
        <div class="table-heade-title">{{ header.title }}</div>
        <stock-cell v-for="(ztCell, index) in header.list" :showCloumn="['name', 'lb']" :data="ztCell"
          :key="ztCell.c"></stock-cell>
      </div>
    </template>
    <template v-if="type == 'list'">
      <sc-table :cloumns="cloumns" :table-data="tableData"></sc-table>
    </template>
  </div>
</template>
<script lang="js">
import stockCell from './stock-cell';
import scTable from './sc-table.vue';
export default {
  components: { stockCell,scTable },
  props: {
    tableList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'flat'
    }
  },
  data() {
    return {
      tabeleHeader: [
        {
          title: '竞价集合',
          start: 92500,
          end: 93000,
          list: []
        },
        {
          title: '9:30-10:00',
          start: 93000,
          end: 100000,
          list: []
        },
        {
          title: '10:00-10:30',
          start: 100000,
          end: 103000,
          list: []
        },
        {
          title: '10:30-11:00',
          start: 103000,
          end: 110000,
          list: []
        },
        {
          title: '11:00-11:30',
          start: 110000,
          end: 113000,
          list: []
        },
        {
          title: '13:00-13:30',
          start: 130000,
          end: 133000,
          list: []
        },
        {
          title: '13:30-14:00',
          start: 133000,
          end: 140000,
          list: []
        },
        {
          title: '14:00-14:30',
          start: 140000,
          end: 143000,
          list: []
        },
        {
          title: '14:30-15:00',
          start: 143000,
          end: 150000,
          list: []
        },
      ],
      tableData: [],
      cloumns: [
        {
          title: '代码',
          prop: 'c',
          color: 'green'
        },
        {
          title: '名称',
          prop: 'n',
          color: 'green'
        }, {
          title: '涨跌幅',
          prop: 'zdp',
          color: '#f00',
          formatter: (row)=>{
            return parseInt(row.zdp * 100) / 100 +'%'
          }
        }, {
          title: '最新价',
          prop: 'p',
          color: '#f00',
          formatter: (row)=>{
            return row.p / 1000
          }
        }, {
          title: '成交额',
          prop: 'amount',
          align: 'left',
          formatter: (row)=>{
            return row.amount > 100000000 ? (parseInt(row.amount / 100000000 * 100)/100 + '亿'):(parseInt(row.amount / 10000 * 100)/100 + '万')
          }
        }, {
          title: '流通市值',
          prop: 'ltsz',
          formatter: (row)=>{
            return row.ltsz > 100000000 ? (parseInt(row.ltsz / 100000000 * 100)/100 + '亿'):(parseInt(row.ltsz / 10000 * 100)/100 + '万')
          }
        }, {
          title: '总市值',
          prop: 'tshare',
          formatter: (row)=>{
            return row.tshare > 100000000 ? (parseInt(row.tshare / 100000000 * 100)/100 + '亿'):(parseInt(row.tshare / 10000 * 100)/100 + '万')
          }
        }, {
          title: '换手率',
          prop: 'hs',
          formatter: (row)=>{
            return parseInt(row.hs * 100) / 100 + '%'
          }
        }, {
          title: '封板资金',
          prop: 'fund',
          formatter: (row)=>{
            return row.fund > 100000000 ? (parseInt(row.fund / 100000000 * 100)/100 + '亿'):(parseInt(row.fund / 10000 * 100)/100 + '万')
          }
        }, {
          title: '首次封板',
          prop: 'fbt',
          formatter: (row)=>{
            const fbt = row.fbt < 100000 ? ('0' + row.fbt) : (row.fbt + '');
            return fbt.slice(0,2) + ':' + fbt.slice(2,4) + ':' + fbt.slice(4,6)
          }
        },
        {
          title: '最后封板',
          prop: 'lbt',
          formatter: (row)=>{
            const lbt = row.lbt < 100000 ? ('0' + row.lbt) : (row.lbt + '');
            return lbt.slice(0,2) + ':' + lbt.slice(2,4) + ':' + lbt.slice(4,6)
          }
        },
        {
          title: '炸板次数',
          prop: 'zbc',
          formatter: (row)=>{
            return  row.zbc + '次'
          }
        }, {
          title: '涨停统计',
          prop: 'zttj',
          color: '#f00',
          formatter: (row)=>{
            return  row.zttj.ct + '/' + row.zttj.days
          }
        }, {
          title: '连板数',
          prop: '名称',
          color: '#f00',
          formatter: (row)=>{
            return row.lbc <= 1 ? '首板' :row.lbc + '板'
          }
        },
        {
          title: '所属行业',
          prop: 'hybk',
        },
      ]
    }
  },
  methods: {
    refreshDate(list) {
      this.tableData = list;
      list.forEach((stockItem) => {
        const findItem = this.tabeleHeader.find((headerItem) => {
          return parseInt(stockItem.fbt) >= headerItem.start && parseInt(stockItem.fbt) < headerItem.end
        })
        if (findItem) {
          findItem.list.push(stockItem);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.zt-table {
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
