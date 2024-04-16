import axios from "axios";
import { Message } from "element-ui";

axios.defaults.timeout = 30000;  //超时时间设置
axios.defaults.withCredentials = true;  //true允许跨域
//Content-Type 响应头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


const request = axios.create({
  baseURL: "http://localhost:8889"
});

// 响应拦截
request.interceptors.response.use(
  (response) => {
    const res = response;
    if (res.data.code !== 200) {
      if (res.data.code === 500 && res.data.data === null) {
        console.log("暂无数据");
      } else {
        let msg = res.data.msg || "Error";
        Message.error(msg);
        return Promise.reject(new Error(msg));
      }
    }
    return res;
  },
  (error) => {
    console.info(error);
    Message.error(error.message);
    return Promise.reject(error);
  }
);

export default request;
