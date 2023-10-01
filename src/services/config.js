import axios from "axios";

const instance = axios.create({
  baseURL: "https://luanpv.id.vn/api/",
  mode: 'no-cors',
});
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
