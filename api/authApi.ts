import axiosClient from '@/config/axiosClient';
import {
  EditInfo,
  OtpValues,
  ResponseTokenProps,
  SigninValues,
  SignupValues,
  UpdateUser,
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

const getInfoUser = () => {
  return axiosClient.get('/api/authen/current-user');
};

const checkUser = (email: string) => {
  return axiosClient.post('/api/authen/check-user', {email});
};

const updatePersonalInfo = (id: number, formValues: EditInfo) => {
  return axiosClient.put(`/api/accounts/${id}`, formValues);
};

const confirmOtp = (formValues: OtpValues) => {
  return axiosClient.post('/api/authen/confirmation', formValues);
};

export {
  login,
  signUp,
  loginGoogle,
  checkUser,
  getInfoUser,
  updatePersonalInfo,
  confirmOtp,
};
