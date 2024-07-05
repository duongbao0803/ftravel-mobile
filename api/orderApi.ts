import axiosClient from '@/config/axiosClient';
import {OrderForm} from '@/types/order.types';

const orderTicket = (formValues: OrderForm) => {
  return axiosClient.post('/api/orders', formValues);
};

export {orderTicket};
