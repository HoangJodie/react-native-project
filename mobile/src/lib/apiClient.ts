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
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("API request:", {
        url: config.url,
        method: config.method,
        params: config.params,

        data: config.data,
        headers: config.headers,
    });
    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        console.log("API response:", JSON.stringify(response, null, 2));
        return response.data.data ?? response.data;
    },
    (error) => {
        console.log("API error:", JSON.stringify(error.response?.data, null, 2));
        if (error.response?.status === 401) {
            AsyncStorage.removeItem('accessToken');
        }
        return Promise.reject(error);
    }
);

export default apiClient;
