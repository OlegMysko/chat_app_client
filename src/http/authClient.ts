import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
// this client does not have auth interceptors
export const authClient = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true,
});

// to awoid getting `res.data` everywhere
authClient.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  res => res.data,
);
