import dayjs from'dayjs';

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
  const day = dayjs(date).day();
  return !window.chineseDays.isHoliday(date) && !(day == 0 || day == 6);
};


export const GET_LAST_DATE = (count) => {
  const arr = [];
  let i = 0;
  do {
    const date = dayjs().subtract(i, "day").format("YYYY-MM-DD");
    if(IS_OPEN_DAY(date)) {
      arr.push(date);
    }
    i++;
  } while( arr.length < count )
  return arr;
};

export const formatMoney = (value) => {
  if (isNaN(value)) {
    return "-";
  }
  const wy = 1000000000000;
  if (value > wy || value < -wy) {
    return parseInt((value / wy) * 100) / 100 + "万亿";
  }

  const y = 100000000;
  if (value > y || value < -y) {
    return parseInt((value / y) * 100) / 100 + "亿";
  }

  const w = 10000;
  if (value > w || value < -w) {
    return parseInt((value / w) * 100) / 100 + "万";
  }

  return value;
};

export const valueStyle = (value) => {
  return {
    color:
      parseFloat(value) > 0 ? "red" : parseFloat(value) == 0 ? "gray" : "green",
  };
};

export const formatPrec = (value, subFix = "") => {
  return isNaN(value) ? "-" : parseInt(value) / 100 + subFix;
};

export const IN_OPEN_TIME = () => {
  return (
    ( dayjs().format("HHmmss") >= "092500" && dayjs().format("HHmmss") <= "113000") || ( dayjs().format("HHmmss") >= "130000" && dayjs().format("HHmmss") <= "150000")
  );
};
