const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 60 * 1000,
  maxRedirects: 0,
});

export default axiosInstance;
