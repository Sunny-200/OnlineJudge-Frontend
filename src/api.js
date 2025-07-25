import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Adjust if your backend is deployed
});

export const register = (formData) => API.post('/register', formData);
export const login = (formData) => API.post('/login', formData);
