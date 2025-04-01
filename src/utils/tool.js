import dayjs from "dayjs";
import calendar from "chinese-calendar";
const getCount = (time) => {
  const sec = parseInt(time.slice(4, 6));
  const min = parseInt(time.slice(2, 4));
  const hour = parseInt(parseInt(time.slice(0, 2)));
  const count = sec + min * 60 + hour * 3600;
  return count;
};
const startVal = getCount("090000");
const fontEndVal = getCount("113000");
const endVal = getCount("153000");
const gapVal = getCount("013000");
const allVal = endVal - startVal - gapVal;

export const xPos = (time) => {
  // 在这里处理间隔
  let countVal = getCount(time);
  console.log(countVal, time, startVal);
  // 大于11:30:00 ，那么就需要减数据
  if (countVal > fontEndVal) {
    console.log("223");
    countVal -= gapVal;
  }
  // 再减去9:15:00
  countVal -= startVal;
  return parseInt((countVal / allVal) * 1000) / 1000;
};
window.xPos = xPos;

export const getFormatTime = (time, split = "-") => {
  const sec = time.slice(4, 6);
  const min = time.slice(2, 4);
  const hour = parseInt(time.slice(0, 2));
  return [hour, min].join(split);
};

export const jsonp = (req, error) => {
  var script = document.createElement("script");
  var url = req;
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
  script.onerror = error;
};

const isObject = (item) => {
  return item && typeof item === "object" && !Array.isArray(item);
};
export const deepMerge = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
};

export const IS_OPEN_DAY = (date) => {
  return !calendar.isHoliday(date);
};

export const GET_LAST_OPENDAY = (count) => {
  let i = 1;
  let j = 0;
  let date = "";
  do {
    date = dayjs().subtract(i, "day").format("YYYY-MM-DD");
    if (IS_OPEN_DAY(date)) {
      j++;
    }
    i++;
  } while (j < count);
  return date.replaceAll("-", "");
};

export const GET_LAST_DATE = (count) => {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(GET_LAST_OPENDAY(i));
  }
  return arr;
};

export const formatMoney = (value) => {
  if(isNaN(value)) {
    return '-'
  }
  return value > 100000000 || value < -100000000
    ? parseInt((value / 100000000) * 100) / 100 + "亿"
    : parseInt((value / 10000) * 100) / 100 + "万";
};

export const valueStyle = (value) => {
  return {
    color: parseFloat(value) > 0 ? "red" : parseFloat(value) == 0 ? "gray" : "green",
  };
};

export const formatPrec = (value, subFix = "") => {
  return isNaN(value) ? "-" : value / 100 + subFix;
};
