import { getZT, getZB, getZRZT } from "@/api/index.js";
import dayjs from "dayjs";
import * as StoreTypes from "../store_types";
export default {
  state: {
    list: [],
    lastUpdate: "",
    showType: "flat",
    tabeleHeader: [
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
    ],
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
    [StoreTypes.UPDATE_HEADER](state) {
      const list = state.list;
      const tabeleHeader = state.tabeleHeader;
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
    },
  },
  actions: {
    async [StoreTypes.UPDATE_LIST_YESTERDAY_ACTION]({ commit }) {
      const zrztData = (await getZRZT()).data.pool || [];
      zrztData.sort((cur,next)=>cur.fbt - next.fbt);
      commit(StoreTypes.UPDATE_LIST, zrztData);
      commit(StoreTypes.UPDATE_TIME);
      commit(StoreTypes.UPDATE_HEADER);
    },
  },
};
