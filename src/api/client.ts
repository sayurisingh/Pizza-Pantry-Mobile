import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.1.105:4000'; // or your local IP for Expo Go

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token automatically if stored
api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;