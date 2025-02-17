<template>
  <layout-warp :lastUpdate="lastUpdate">
    <template slot="layout-right">
      <switch-icon open-title="列表" :open-icon="require('@/assets/列表.png')" close-title="平铺"
        :close-icon="require('@/assets/平铺.png')" :open="open" @open="switchType('list')"
        @close="switchType('flat')"></switch-icon>
    </template>
    <content-warp v-bind="$attrs" :title="title">
      <!-- <stock-info>
        
      </stock-info> -->
      <template v-if="type == 'flat'">
        <sc-flat :tabeleHeader="tabeleHeader"></sc-flat>
      </template>
      <template v-if="type == 'list'">
        <sc-table :cloumns="cloumns" :options="options" :table-data="tableData">
          <template v-slot:slot-row="{ code }">
          </template>
        </sc-table>
      </template>
    </content-warp>
    <slide direction="bottom" append-to-body width="50%">
      <layout-warp :lastUpdate="lastUpdate">
        <content-warp title="设置">
          <setting-pane></setting-pane>
        </content-warp>
      </layout-warp>
    </slide>
  </layout-warp>
</template>
<script lang="js">
import contentWarp from '@/components/content-warp';
import layoutWarp from '@/components/layout-warp';
import Slide from '@/components/slide';
import scTable from '@/components/sc-table';
import scFlat from '@/components/sc-flat';
import switchIcon from '@/components/switch-icon';
import { mapGetters, mapState, mapMutations } from 'vuex';
import * as STORE_TYPES from '@/store/store_types';
import SettingPane from './components/setting-pane.vue';
import { mapActions } from 'vuex';
import StockInfo from './components/stock-info.vue';
export default {
  components: { Slide, contentWarp, layoutWarp, scTable, scFlat, switchIcon, SettingPane, StockInfo },
  data() {
    return {
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
          color: (row) => {
            if (row.zdp > 0) {
              return '#f00'
            } else {
              return 'green'
            }
          },
          formatter: (row) => {
            return parseInt(row.zdp * 100) / 100 + '%'
          }
        }, {
          title: '最新价',
          prop: 'p',
          color: '#f00',
          formatter: (row) => {
            return row.p / 1000
          }
        }, {
          title: '成交额',
          prop: 'amount',
          align: 'left',
          formatter: (row) => {
            return row.amount > 100000000 ? (parseInt(row.amount / 100000000 * 100) / 100 + '亿') : (parseInt(row.amount / 10000 * 100) / 100 + '万')
          }
        }, {
          title: '流通市值',
          prop: 'ltsz',
          formatter: (row) => {
            return row.ltsz > 100000000 ? (parseInt(row.ltsz / 100000000 * 100) / 100 + '亿') : (parseInt(row.ltsz / 10000 * 100) / 100 + '万')
          }
        }, {
          title: '总市值',
          prop: 'tshare',
          formatter: (row) => {
            return row.tshare > 100000000 ? (parseInt(row.tshare / 100000000 * 100) / 100 + '亿') : (parseInt(row.tshare / 10000 * 100) / 100 + '万')
          }
        }, {
          title: '换手率',
          prop: 'hs',
          formatter: (row) => {
            return parseInt(row.hs * 100) / 100 + '%'
          }
        }, {
          title: '封板资金',
          prop: 'fund',
          color: (row) => {
            if (row.zb) {
              return 'green'
            }
          },
          formatter: (row) => {
            if (row.zb) {
              return '0'
            }
            return row.fund > 100000000 ? (parseInt(row.fund / 100000000 * 100) / 100 + '亿') : (parseInt(row.fund / 10000 * 100) / 100 + '万')
          }
        }, {
          title: '首次封板',
          prop: 'fbt',
          formatter: (row) => {
            const fbt = row.fbt < 100000 ? ('0' + row.fbt) : (row.fbt + '');
            return fbt.slice(0, 2) + ':' + fbt.slice(2, 4) + ':' + fbt.slice(4, 6)
          }
        },
        {
          title: '最后封板',
          prop: 'lbt',
          formatter: (row) => {
            if (row.zb) {
              return ''
            }
            const lbt = row.lbt < 100000 ? ('0' + row.lbt) : (row.lbt + '');
            return lbt.slice(0, 2) + ':' + lbt.slice(2, 4) + ':' + lbt.slice(4, 6)
          }
        },
        {
          title: '炸板次数',
          prop: 'zbc',
          formatter: (row) => {
            return row.zbc + '次'
          }
        }, {
          title: '涨停统计',
          prop: 'zttj',
          color: (row) => {
            if (row.zb) {
              return 'green'
            }
            return '#f00'
          },
          formatter: (row) => {
            return row.zttj.ct + '/' + row.zttj.days
          }
        }, {
          title: '连板数',
          prop: '名称',
          color: (row) => {
            if (row.zb) {
              return 'green'
            }
            return '#f00'
          },
          formatter: (row) => {
            if (row.zb) {
              return '炸板'
            }
            return row.lbc <= 1 ? '首板' : row.lbc + '板'
          }
        },
        {
          title: '所属行业',
          prop: 'hybk',
        },
      ],
      options: {
        row: {
          style: (row) => {
            if (row.zb) {
              return {
                background: '#ccc'
              }
            } else {
              return {
              }
            }
          }
        }
      },
    }
  },
  computed: {
    ...mapState('zt', {
      lastUpdate: 'lastUpdate',
      type: 'showType'
    }),
    ...mapGetters('zt', [
      'tableData',
      'tabeleHeader'
    ]),
    title() {
      return `触及涨停:${this.tableData.length}只`
    },
    open() {
      return this.type == 'list'
    },
  },
  mounted() {
    setInterval(() => {
      this.getToday().then(() => {
      })
    }, 3000)
  },
  methods: {
    ...mapMutations('zt', {
      switchType: STORE_TYPES.UPDATE_SHOW_TYPE,
    }),
    ...mapActions('zt', {
      getToday: STORE_TYPES.UPDATE_LIST_TODAY_ACTION
    })
  }
}
</script>

<style lang="less" scoped></style>
