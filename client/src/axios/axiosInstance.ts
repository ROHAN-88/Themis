import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export const app_axios_interface = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: { "X-Custom-header": "1.0.1" },
});

app_axios_interface.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const get_access_token = await cookieStore.get("access_token");
    const token = get_access_token?.value;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

// app_axios_interface.interceptors.response.use(
//   function onFullfilled(response) {
//     return response;
//   },
//   async function onRejected(error) {
//     const userId = localStorage.getItem("user_id");
//   },
// );
