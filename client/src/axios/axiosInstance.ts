import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
    baseURL:'/api',
    timeout:5000,
    headers:{'X-Custom-header': "1.0.1"}
});
const get_access_token = ():string | null => localStorage.getItem('access_token');
// const get_refresh_token = ():string | null => localStorage.getItem('refresh_token');

axios.interceptors.request.use((config:InternalAxiosRequestConfig):InternalAxiosRequestConfig => {
  const token = get_access_token();

  if(token && config.headers){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
  
} ,
(error: AxiosError):Promise<AxiosError> =>{
    return Promise.reject(error)
});


