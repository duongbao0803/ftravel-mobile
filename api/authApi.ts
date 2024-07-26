import axiosClient from '@/config/axiosClient';
import {
  EditInfo,
  FcmValues,
  OtpValues,
  SigninValues,
  SignupValues,
} from '@/types/auth.types';

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

const updatePersonalInfo = (formValues: EditInfo) => {
  return axiosClient.put(`/api/accounts`, formValues);
};

const confirmOtp = (formValues: OtpValues) => {
  return axiosClient.post('/api/authen/confirmation', formValues);
};

const sendFcm = (formValues: FcmValues) => {
  return axiosClient.put('/api/accounts/update-fcm-token', formValues);
};

export {
  login,
  signUp,
  loginGoogle,
  checkUser,
  getInfoUser,
  updatePersonalInfo,
  confirmOtp,
  sendFcm,
};
