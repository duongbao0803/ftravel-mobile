import axiosClient from '@/config/axiosClient';
import {
  ResponseTokenProps,
  SigninValues,
  SignupValues,
} from '@/types/auth.types';
import {AxiosResponse} from 'axios';

const login = (formValues: SigninValues) => {
  return axiosClient.post('/api/authen/login', formValues);
};

const signUp = (formValues: SignupValues) => {
  return axiosClient.post('/api/authen/register', formValues);
};

const loginGoogle = (idToken: string) => {
  return axiosClient.post('/api/authen/login-with-google', idToken);
};

const requestRefreshToken = (
  jwtToken: string,
): Promise<AxiosResponse<ResponseTokenProps>> => {
  return axiosClient.post<ResponseTokenProps>(
    '/api/authen/refresh-token',
    jwtToken,
  );
};

const getInfoUser = () => {
  return axiosClient.get('/api/authen/current-user');
};

export {login, getInfoUser, signUp, requestRefreshToken, loginGoogle};
