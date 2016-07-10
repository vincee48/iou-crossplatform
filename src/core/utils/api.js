import axios from 'axios';
import { isBrowser } from './index';
import reactCookie from 'react-cookie';

function getHeaders() {
  const cookie = reactCookie.load('access_token');
  return cookie ? {
    Authorization: `Bearer ${cookie}`,
  } : {};
}

export default function api() {
  return axios.create({
    baseURL: process.env.API_SERVER,
    headers: getHeaders(),
  });
}
