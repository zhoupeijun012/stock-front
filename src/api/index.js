import httpRequest from "@/utils/http";

export const getStockList = (params) => {
  return httpRequest.post("/getStockList", params);
};

export const getEtfList = (params) => {
  return httpRequest.post("/getEtfList", params);
};

export const getConceptList = (params) => {
  return httpRequest.post("/getConceptList", params);
};

export const getIndustryList = (params) => {
  return httpRequest.post("/getIndustryList", params);
};

export const getRegionList = (params) => {
  return httpRequest.post("/getRegionList", params);
};

export const getLofList = (params) => {
  return httpRequest.post("/getLofList", params);
};

export const getLimitList = (params) => {
  return httpRequest.post("/getLimitList", params);
};

export const getTaskList = (params) => {
  return httpRequest.post("/getTaskList", params);
};

export const getNpList = (params) => {
  return httpRequest.post("/getNpList", params);
};

export const taskRetry = (params) => {
  return httpRequest.post("/taskRetry", params);
};

export const getKLineList = (params) => {
  return httpRequest.post("/getKLineList", params);
};

export const getKLineOne = (params) => {
  return httpRequest.post("/getKLineOne", params);
};

export const getFundList = (params) => {
  return httpRequest.post("/getFundList", params);
};

export const getFundOne = (params) => {
  return httpRequest.post("/getFundOne", params);
};

export const getRegionOne = (params)=>{
  return httpRequest.post("/getRegionOne", params);
}

export const getIndustryOne = (params)=>{
  return httpRequest.post("/getIndustryOne", params);
}

export const getStockOne = (params)=>{
  return httpRequest.post("/getStockOne", params);
}

export const getConceptOne = (params)=>{
  return httpRequest.post("/getConceptOne", params);
}