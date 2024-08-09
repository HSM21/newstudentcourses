import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:1425', // Ensure this matches your backend server's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
