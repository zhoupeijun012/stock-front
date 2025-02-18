import httpRequest from '@/utils/http';

export const getStockList = (params)=>{
  return httpRequest.post('/getStockList',params)
}