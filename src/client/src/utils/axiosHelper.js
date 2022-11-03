const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 60 * 1000,
  maxRedirects: 0,
});

export default axiosInstance;
