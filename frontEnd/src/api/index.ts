import axios from "axios";
import { baseURL } from "../config";
import { message } from "antd";

const api = axios.create({
  baseURL,
});

api.interceptors.response.use((res) => {
  console.log("res");
  if (res.data.code === 200) {
    return res.data;
  } else {
    message.error(res.data.message);
    return null;
  }
});

const job = {
  create: async (params?: any) => api.post("/job", params),
  list: async (params?: any) => api.get("/job", params),
  createCron: async (params?: any) => api.post("/cron", params),
};

const apiEx = {
  job
}

export default apiEx;
