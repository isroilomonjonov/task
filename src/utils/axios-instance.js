import axios from "axios";
const axiosInstance = axios.create({
  baseURL: `https://sub.ox-sys.com`,
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const subdomain = localStorage.getItem("subdomain");
  config.baseURL = config.baseURL.replace("sub", subdomain);
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});
export default axiosInstance;
