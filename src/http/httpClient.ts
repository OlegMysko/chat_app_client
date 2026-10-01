import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const httpClient = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true,
});


httpClient.interceptors.request.use(request => {




  return request;
});

httpClient.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  res => res.data,




);
