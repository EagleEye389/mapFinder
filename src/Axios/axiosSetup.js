import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://mock-api.dev.lalamove.com',
    headers: {'Content-Type': 'application/json'}
  });

export default instance;