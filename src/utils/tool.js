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

export const jsonp = (req,error) =>{
  var script = document.createElement("script");
  var url = req;
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
  script.onerror = error;
}

const isObject = (item)=> {
  return (item && typeof item === 'object' && !Array.isArray(item));
}
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
}

