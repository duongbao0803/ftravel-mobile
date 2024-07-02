import axiosClient from '@/config/axiosClient';
import {ChargeToken} from '@/types/wallet.types';

const getBalances = () => {
  return axiosClient.get('/api/wallets/customer');
};

const chargeToken = (formValues: ChargeToken) => {
  return axiosClient.post('/api/wallets/customer/recharge/create', formValues);
};

export {getBalances, chargeToken};
