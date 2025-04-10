<template>
  <el-scrollbar class="scroll-warp">
    <el-row class="limit-card" :gutter="8">
      <el-col
        class="limit-item"
        v-for="(limitItem, index) in tableData"
        :key="'limit-item-' + index"
        :span="6"
      >
        <div>{{ limitItem.f14 }}</div>
        <div>{{ limitItem.f3 }}</div>
        <div>{{ limitItem.count }}</div>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>
<script>
import { getLimitList } from "@/api/index";
import { IN_OPEN_TIME } from "@/utils/tool";
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getDetail();
    this.timer = setInterval(() => {
      if (IN_OPEN_TIME()) {
        this.getDetail();
      }
    }, 60 * 1000);
  },
  methods: {
    getDetail() {
      const params = {
        pageNum: 1,
        pageSize: 1000,
        where: {
          date: "20250409" || dayjs().format("YYYY-MM-DD"),
        },
        matchKey: ["f103", "f12", "f100", "f102"],
      };
      getLimitList(params).then((data) => {
        const { list } = data;
        const gnMap = {};
        list.forEach((item) => {
          if (item["c_f103"]) {
            const arrList = JSON.parse(item["c_f103"]);
            arrList.forEach((mapItem) => {
              const mapGn = gnMap[mapItem["f12"]];
              if (mapGn) {
                mapGn["count"]++;
              } else {
                gnMap[mapItem["f12"]] = {
                  f14: mapItem.f14,
                  f12: mapItem.f14,
                  type: "",
                  count: 1,
                };
              }
            });
          }
        //   if (item["c_f100"]) {
        //     const arrList = JSON.parse(item["c_f100"]);
        //     arrList.forEach((mapItem) => {
        //       const mapGn = gnMap[mapItem["f12"]];
        //       if (mapGn) {
        //         mapGn["count"]++;
        //       } else {
        //         gnMap[mapItem["f12"]] = {
        //           f14: mapItem.f14,
        //           f12: mapItem.f14,
        //           type: "",
        //           count: 1,
        //         };
        //       }
        //     });
        //   }
          //   if (item["c_f102"]) {
          //     const arrList = JSON.parse(item["c_f102"]);
          //     arrList.forEach((mapItem) => {
          //       const mapGn = gnMap[mapItem["f12"]];
          //       if (mapGn) {
          //         mapGn["count"]++;
          //       } else {
          //         gnMap[mapItem["f12"]] = {
          //           f14: mapItem.f14,
          //           f12: mapItem.f14,
          //           type: "",
          //           count: 1,
          //         };
          //       }
          //     });
          //   }
        });
        this.tableData = Object.values(gnMap).sort((cur,next)=>next.count-cur.count);
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="less" scoped>
.scroll-warp {
  height: 100%;
  width: 100%;
  /deep/.el-scrollbar__wrap {
    overflow: hidden;
    overflow-y: overlay;
    scrollbar-gutter: stable;
    &::-webkit-scrollbar {
      width: 0; /* Chrome/Safari */
      background: transparent;
    }
  }
  /deep/.el-scrollbar__bar {
    display: none;
  }
}
.limit-card {
  .limit-item {
    font-size: 14px;
    border: 1px solid #fafafa;
    border-radius: 4px;
    line-height: 24px;
    box-sizing: border-box;
    display: flex;
  }
}
</style>
