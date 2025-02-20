const axios = require("axios");

import { Notification } from "element-ui";
// 创建一个具有默认配置的axios实例
const instance = axios.create({
  baseURL: "/api",
  timeout: 5 * 1000,
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.success) {
      return response.data.data;
    } else {
      Notification({
        title: "网络错误",
        message: response.data.message,
      });
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
  (error) => {
    if (error.message) {
      Notification({
        title: "网络错误",
        message: error.message,
      });
    }
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
);

export default instance;
