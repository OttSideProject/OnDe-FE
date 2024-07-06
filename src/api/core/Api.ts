import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_END_POINT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default Api;
