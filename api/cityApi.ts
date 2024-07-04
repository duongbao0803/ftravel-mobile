import axiosClient from '@/config/axiosClient';

const getCities = () => {
  return axiosClient.get('/api/cities');
};

export {getCities};
