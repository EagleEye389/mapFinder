import axios from 'axios';

/**
 * @name instance
 * @description Wrapper over the axios
 * @returns axios instance
 */
const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {'Content-Type': 'application/json'}
  });

export default instance;