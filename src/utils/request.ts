import axios from "axios";

axios.defaults.timeout = 5000;

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    const c_token = localStorage.getItem("token");
    if (c_token) {
      config.headers.Authorization = "Bearer " + c_token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 添加响应拦截器
axios.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
);

export default axios;
