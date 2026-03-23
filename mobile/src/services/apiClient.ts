import axios from 'axios';
import { Platform } from 'react-native';
import { paramsSerializer } from '../utils/paramsSerializer';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultBaseURL = Config.API_URL ?? 'http://localhost:3000';
const apiClient = axios.create({
    baseURL: defaultBaseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    paramsSerializer,
});
console.log(defaultBaseURL)

apiClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response.data.data ?? response.data,
    (error) => {
        if (error.response?.status === 401) {
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('user');
        }
        return Promise.reject(error);
    }
);

export default apiClient;
