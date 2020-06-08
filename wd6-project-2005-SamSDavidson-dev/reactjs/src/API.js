import axios from 'axios';

const API = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:5000',
});

API.interceptors.response.use(
  (response) => (response ? response.data : {}),
  (error) => {
    console.log(error);
  },
);

API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (!token) return config;
  return {
    ...config,
    headers: { common: { token } },
  };
});

export default API;