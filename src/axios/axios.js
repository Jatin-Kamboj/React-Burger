import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://burger-builder-47638.firebaseio.com/"
});

axiosInstance.interceptors.request.use(request => {
  // console.log("request => ", request);
  return request;
});
