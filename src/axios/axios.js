import React from "react";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://burger-builder-47638.firebaseio.com/"
});

//   axios.interceptors.request.use(request => {
//     console.log("request => ", request);
//     request.url = "https://burger-builder-47638.firebaseio.com/";
//   });
// }
