import requestRefreshToken from '@/api/refreshTokenApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://ftravelapi.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async config => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error('Error fetching access token from AsyncStorage', error);
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      try {
        if (refreshToken) {
          const res = await requestRefreshToken(refreshToken);
          if (res && res.status === 200) {
            const data = res.data['access-token'];
            await AsyncStorage.setItem('accessToken', data);
            axiosClient.defaults.headers.common['Authorization'] =
              `Bearer ${data}`;
            originalRequest.headers['Authorization'] = `Bearer ${data}`;
          }
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token', refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
