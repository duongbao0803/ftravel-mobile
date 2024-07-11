import axiosClient from '@/config/axiosClient';

const getServiceByRoute = (routeId: number) => {
  return axiosClient.get(`/api/services/by-route-id/${routeId}`);
};

export {getServiceByRoute};
