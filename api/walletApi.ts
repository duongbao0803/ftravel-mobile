import axiosClient from '@/config/axiosClient';
import {ChargeToken} from '@/types/wallet.types';

const getBalances = () => {
  return axiosClient.get('/api/wallets/customer');
};

const chargeToken = (formValues: ChargeToken) => {
  return axiosClient.post('/api/wallets/customer/recharge/create', formValues);
};

const getTransactions = (page: number, walletId: number) => {
  return axiosClient.get(`/api/wallets/${walletId}/transaction`, {
    params: {
      'page-index': page,
      'page-size': 20,
    },
  });
};

export {getBalances, chargeToken, getTransactions};
