import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

// 使用类的方式进行封装：类有更强的内聚性,可以把多个东西封装到一起
class HYRequest {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });

    this.instance.interceptors.response.use(
      // 响应成功拦截

      (res) => {
        return res.data;
      },
      (err) => {
        // 响应失败拦截
        return err;
      }
    );
  }

  request(config) {
    return this.instance.request(config);
  }

  get(config) {
    return this.request({ ...config, method: "get" });
  }

  post(config) {
    return this.request({ ...config, method: "post" });
  }
}

export default new HYRequest(BASE_URL, TIMEOUT);
