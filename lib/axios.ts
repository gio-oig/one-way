import axios from "axios";
import { getToken } from "utils/functions";

const axiosInst = axios.create();

axiosInst.interceptors.request.use(
  (config) => {
    if (config.headers)
      config.headers["Authorization"] = "bearer " + getToken();

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInst;
