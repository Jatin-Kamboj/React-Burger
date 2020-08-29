import axios from "axios";
import { responseCodes } from "../common";

export const axiosInstance = axios.create({
  baseURL: "https://burger-builder-47638.firebaseio.com/",
});

axiosInstance.interceptors.request.use((request) => {
  // console.log("request => ", request);
  // if(request.re)
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("response => ", response);
    // if(request.re)
    return response;
  },
  (error) => {
    if (error.response.status === responseCodes.unAuthorised) {
      // console.log("response error", error.response.status);
    }
  }
);
