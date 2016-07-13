import axios from 'axios';
import { isBrowser } from './index';

export default function api() {
  return axios.create({
    baseURL: process.env.API_SERVER,
  });
}
