import httpRequest from '@/utils/http';

export const getStockList = (params)=>{
  return httpRequest.post('/getStockList',params)
}

export const getEtfList = (params)=>{
  return httpRequest.post('/getEtfList',params)
}