import axios from "axios";
import Cookies from "js-cookie";

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

app.interceptors.request.use(
  (config) => {
    let token;
    if (typeof window !== "undefined") {
      token = Cookies.get("token");
    } else {
      token = undefined;
    }
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

app.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;
