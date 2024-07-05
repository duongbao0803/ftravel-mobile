import axiosClient from '@/config/axiosClient';

const getNotification = () => {
  return axiosClient.get('/api/notifications/user');
};

export {getNotification};
