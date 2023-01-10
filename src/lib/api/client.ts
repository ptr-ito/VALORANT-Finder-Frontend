import applyCaseMiddleware from "axios-case-converter";
import axios, { AxiosResponse } from "axios";

const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
  options
);

// client.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
//   const data = response.data;
//   return { ...response.data, data };
// });

export default client;
