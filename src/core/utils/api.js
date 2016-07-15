import axios from 'axios';

export default function api() {
  return axios.create({
    baseURL: process.env.API_SERVER,
  });
}
