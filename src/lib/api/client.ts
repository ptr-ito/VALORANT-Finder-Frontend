import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
  options
);

export default client;
