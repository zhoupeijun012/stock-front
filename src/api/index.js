import { jsonp } from "@/utils/tool";
import dayjs from "dayjs";

export const getZT = (params = {}) => {
  params = {
    date: params.date || dayjs().format("YYYYMMDD"),
  };
  return new Promise((resolve, reject) => {
    window.ztCallback = (data) => {
      resolve(data);
    };
    jsonp(
      `https://push2ex.eastmoney.com/getTopicZTPool?cb=ztCallback&ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wz.ztzt&Pageindex=0&pagesize=1000&sort=fbt%3Aasc&date=${params.date}&_=1736816412391`,
      (error) => {
        reject(error);
      }
    );
  });
};


export const getZRZT = (params = {}) => {
  params = {
    date: params.date || dayjs().format("YYYYMMDD"),
  };
  return new Promise((resolve, reject) => {
    window.zrztCallback = (data) => {
      resolve(data);
    };
    jsonp(
      `https://push2ex.eastmoney.com/getYesterdayZTPool?cb=zrztCallback&ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wz.ztzt&Pageindex=0&pagesize=1000&sort=zs%3Adesc&date=${params.date}&_=1736816412392`,
      (error) => {
        reject(error);
      }
    );
  });
};

export const getZB = (params = {}) => {
  params = {
    date: params.date || dayjs().format("YYYYMMDD"),
  };
  return new Promise((resolve, reject) => {
    window.zbCallback = (data) => {
      resolve(data);
    };
    jsonp(
      `https://push2ex.eastmoney.com/getTopicZBPool?cb=zbCallback&ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wz.ztzt&Pageindex=0&pagesize=1000&sort=fbt%3Aasc&date=${params.date}&_=1736816412395`,
      (error) => {
        reject(error);
      }
    );
  });
};
