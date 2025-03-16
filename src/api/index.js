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

export const getTaskList =  (params) => {
  return httpRequest.post("/getTaskList", params);
};

export const getNpList =  (params) => {
  return httpRequest.post("/getNpList", params);
};

export const taskRetry =  (params) => {
  return httpRequest.post("/taskRetry", params);
};



