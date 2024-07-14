import axiosClient from '@/config/axiosClient';

const getServiceByRoute = (routeId: number) => {
  return axiosClient.get(`/api/services/by-route-id/${routeId}`);
};

const getDetailService = (serviceId: number) => {
  return axiosClient.get(`/api/services/${serviceId}`);
};

export {getServiceByRoute, getDetailService};
