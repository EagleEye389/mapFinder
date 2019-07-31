import axios from 'axios';
import {baseUrl} from '../common/Config';

const instance = axios.create({
    baseURL: baseUrl,
    headers: {'Content-Type': 'application/json'}
  });

export default instance;