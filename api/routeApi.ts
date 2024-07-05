import axiosClient from '@/config/axiosClient';

const getRouteDetail = (routeId: number) => {
  return axiosClient.get(`/api/routes/${routeId}`);
};

export {getRouteDetail};
