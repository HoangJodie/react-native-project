import axios from 'axios';
import { paramsSerializer } from '../utils/paramsSerializer';
import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';

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

apiClient.interceptors.request.use(async (config) => {
    const credentials = await Keychain.getGenericPassword();
    const token = credentials ? credentials.password : null;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        return response.data.data ?? response.data;
    },
    async (error) => {
        if (error.response?.status === 401) {
            await Keychain.resetGenericPassword();
        }
        return Promise.reject(error);
    }
);

export default apiClient;