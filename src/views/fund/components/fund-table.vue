<template>
  <ft-table
    :options="options"
    ref="ft-table"
    :show-pager="false"
    :auto-height="false"
  >
  </ft-table>
</template>
<script>
import FtTable from "@/components/ft-table";
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
export default {
  components: {
    FtTable,
  },
  data() {
    return {
      options: {
        columns: [
          {
            prop: "f221",
            label: "日期",
            minWidth: "80px",
            showOverflowTooltip: true,
          },
          {
            prop: "f2",
            label: "收盘价",
            minWidth: "60px",
            cellStyle: (row) => {
              return {
                color: "red",
              };
            },
          },
          {
            prop: "f3",
            label: "涨跌幅",
            minWidth: "60px",
            cellStyle: (row) => {
              return valueStyle(row.f3);
            },
            formatter: (row) => {
              return row.f3 + "%";
            },
          },
          {
            prop: "f62",
            label: "主力净流入",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f62);
            },
            formatter: (row) => {
              return formatMoney(row.f62);
            },
          },
          {
            prop: "f66",
            label: "超大单净流入",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f66);
            },
            formatter: (row) => {
              return formatMoney(row.f66);
            },
          },
          {
            prop: "f72",
            label: "大单净流入",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f72);
            },
            formatter: (row) => {
              return formatMoney(row.f72);
            },
          },
          {
            prop: "f78",
            label: "中单净流入",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f78);
            },
            formatter: (row) => {
              return formatMoney(row.f78);
            },
          },
          {
            prop: "f84",
            label: "小单净流入",
            minWidth: "100px",
            cellStyle: (row) => {
              return valueStyle(row.f84);
            },
            formatter: (row) => {
              return formatMoney(row.f84);
            },
          },
        ],
      },
    };
  },
  methods: {
    refresh(tableData) {
        this.$refs['ft-table'] && (this.$refs['ft-table'].refresh(tableData));
    }
  },
};
</script>
