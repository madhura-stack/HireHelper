
import axios from "axios";

let setGlobalLoading = null;

export const setLoader = (setLoading) => {
  setGlobalLoading = setLoading;
};

const API = axios.create({
  baseURL: "https://hirehelper-21jb.onrender.com/api",
  withCredentials: false,
});

API.interceptors.request.use(
  (config) => {
    if (setGlobalLoading) {
      setGlobalLoading(true);
    }

    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    if (setGlobalLoading) setGlobalLoading(false);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    if (setGlobalLoading) setGlobalLoading(false);
    return response;
  },
  (error) => {
    if (setGlobalLoading) setGlobalLoading(false);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default API;
