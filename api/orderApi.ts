import axiosClient from '@/config/axiosClient';
import {OrderForm} from '@/types/order.types';

const orderTicket = (formValues: OrderForm) => {
  return axiosClient.post('/api/orders', formValues);
};

const orderedTicket = (cusid: number) => {
  return axiosClient.get(`/api/orderedticket/historytrip/${cusid}`);
};

const getDetailOrder = (id: number) => {
  return axiosClient.get(`/api/orders/${id}`);
};

export {orderTicket, orderedTicket, getDetailOrder};
