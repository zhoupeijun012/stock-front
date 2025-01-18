import { getZT, getZB, getZRZT } from "@/api/index.js";
import dayjs from "dayjs";
import * as StoreTypes from "../store_types";
export default {
  namespaced: true,
  state: {
    list: [],
    lastUpdate: "",
    showType: "flat",
    ztType: [0],
    ztTypeFull: false,
    ztCount: [],
    ztCountFull: true,
    ztHy: [],
    ztHyFull: true,
  },
  getters: {
    ztOptions(state) {
      return [
        {
          label: "涨停",
          value: 0,
          count: state.list.filter((item) => !item.zb).length,
        },
        {
          label: "炸板",
          value: 1,
          count: state.list.filter((item) => item.zb).length,
        },
      ];
    },
    ztCountOptions(state, getters) {
      const countObj = {};
      for (let item of getters.ztTableData) {
        if (item["lbc"]) {
          if (countObj[item["lbc"]]) {
            countObj[item["lbc"]]++;
          } else {
            countObj[item["lbc"]] = 1;
          }
        }
      }

      let lbArr = [];
      const keys = Object.keys(countObj).sort((cur, next) => next - cur);
      for (let key of keys) {
        lbArr.push({
          label: key <= 0 ? "首板" : `${key}连板`,
          value: key || 0,
          count: countObj[key],
        });
      }
      if (state.ztCountFull) {
        state.ztCount = lbArr.map((item) => item.value);
      }
      return lbArr;
    },
    ztHyOptions(state, getters) {
      const countObj = {};
      for (let item of getters.ztCountData) {
        if (countObj[item["hybk"]]) {
          countObj[item["hybk"]]++;
        } else {
          countObj[item["hybk"]] = 1;
        }
      }

      let allHy = [];
      const keys = Object.keys(countObj).sort(
        (cur, next) => countObj[next] - countObj[cur]
      );
      for (let key of keys) {
        allHy.push({
          label: key,
          value: key,
          count: countObj[key],
        });
      }
      if (state.ztHyFull) {
        state.ztHy = allHy.map((item) => item.value);
      }
      return allHy;
    },
    ztTableData(state,getters) {
      let list = state.list;
      // 筛选出涨停数据
      list = list.filter((item) => {
        if (state.ztType.includes(1)) {
          return state.ztType.includes(item.zb) || item.zb == 1;
        } else {
          return state.ztType.includes(item.zb);
        }
      });
      return list;
    },
    ztCountData(state,getters) {
      let list = getters.ztTableData;

      // 筛选出几板数据
      list = list.filter((item) => {
        if (state.ztType.includes(1)) {
          return state.ztCount.includes(item.lbc + "") || item.zb == 1;
        } else {
          return state.ztCount.includes(item.lbc + "");
        }
      });
      return list;
    },
    ztHyData(state,getters) {
      let list = getters.ztCountData;
      // // 筛选出行业数据
      list = list.filter((item) => state.ztHy.includes(item.hybk));
      return list;
    },
    tableData(state, getters) {
      let list = getters.ztHyData;

      return list;
    },
    tabeleHeader(state, getters) {
      const tabeleHeader = [
        {
          title: "竞价集合",
          start: 92500,
          end: 93000,
          list: [],
        },
        {
          title: "9:30-10:00",
          start: 93000,
          end: 100000,
          list: [],
        },
        {
          title: "10:00-10:30",
          start: 100000,
          end: 103000,
          list: [],
        },
        {
          title: "10:30-11:00",
          start: 103000,
          end: 110000,
          list: [],
        },
        {
          title: "11:00-11:30",
          start: 110000,
          end: 113000,
          list: [],
        },
        {
          title: "13:00-13:30",
          start: 130000,
          end: 133000,
          list: [],
        },
        {
          title: "13:30-14:00",
          start: 133000,
          end: 140000,
          list: [],
        },
        {
          title: "14:00-14:30",
          start: 140000,
          end: 143000,
          list: [],
        },
        {
          title: "14:30-15:00",
          start: 143000,
          end: 150000,
          list: [],
        },
      ];
      const list = getters.tableData;
      list.forEach((stockItem) => {
        const findItem = tabeleHeader.find((headerItem) => {
          return (
            parseInt(stockItem.fbt) >= headerItem.start &&
            parseInt(stockItem.fbt) < headerItem.end
          );
        });
        if (findItem) {
          findItem.list.push(stockItem);
        }
      });
      return tabeleHeader;
    },
  },
  mutations: {
    [StoreTypes.UPDATE_TIME](state) {
      state.lastUpdate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    },
    [StoreTypes.UPDATE_SHOW_TYPE](state, type) {
      state.showType = type;
    },
    [StoreTypes.UPDATE_LIST](state, list) {
      state.list = list;
    },
    [StoreTypes.UPDATE_SLIDE_OPEN](state, data) {
      state.slideOpen = data;
    },
    [StoreTypes.UPDATE_ZT_TYPE_FULL](state, data) {
      state.ztTypeFull = data;
    },
    [StoreTypes.UPDATE_ZT_COUNT_FULL](state, data) {
      state.ztCountFull = data;
    },
    [StoreTypes.UPDATE_ZT_HY_FULL](state, data) {
      state.ztHyFull = data;
    },

    [StoreTypes.UPDATE_ZT_TYPE](state, list) {
      state.ztType = list;
    },
    [StoreTypes.UPDATE_ZT_COUNT](state, list) {
      state.ztCount = list;
    },
    [StoreTypes.UPDATE_ZT_HY](state, list) {
      state.ztHy = list;
    },
  },
  actions: {
    async [StoreTypes.UPDATE_LIST_TODAY_ACTION]({ commit }) {
      const ztData = (await getZT()).data.pool || [];
      ztData.forEach((item) => {
        item["zb"] = 0;
      });
      const zbData = (await getZB()).data.pool || [];
      zbData.forEach((item) => {
        item["zb"] = 1;
      });
      const list = [...ztData, ...zbData];
      list.sort((cur, next) => cur.fbt - next.fbt);
      commit(StoreTypes.UPDATE_LIST, list);
      commit(StoreTypes.UPDATE_TIME);
    },
  },
};
