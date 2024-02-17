import axios from "axios";

axios.defaults.baseURL = "https://valantines-drf-8626efa242cc.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
