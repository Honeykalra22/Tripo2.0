import axios from 'axios';
import { BASE_URL } from '../constant.js';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosInstance;