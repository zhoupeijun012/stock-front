const axios = require("axios");

import { Notification } from 'element-ui';
// 创建一个具有默认配置的axios实例
const instance = axios.create({
  baseURL: "/api",
  timeout: 60 * 1000,
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.success) {
      return Promise.resolve(response.data.data || {});
    } else {
      Notification({
        title: '网络错误',
        message: response.data.message
      });
    }
  },
  (error) => {
    if (error.message) {
      Notification({
        title: '网络错误',
        message: error.message
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
