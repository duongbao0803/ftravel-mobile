import axiosClient from '@/config/axiosClient';

const getAllTicket = (page: number) => {
  return axiosClient.get(`/api/my-tickets`, {
    params: {
      'page-index': page,
      'page-size': 50,
    },
  });
};

const getDetailTicket = (ticketId: number) => {
  return axiosClient.get(`/api/my-tickets/${ticketId}`);
};

export {getAllTicket, getDetailTicket};
