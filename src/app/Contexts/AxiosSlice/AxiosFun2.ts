import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5099/",
});

export function setAxiosToken(token: string) {
    axiosInstance.defaults.headers.common = {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${token}`
    }
}


