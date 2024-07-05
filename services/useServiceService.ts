import {getServiceByRoute} from '@/api/serviceApi';

const useServiceService = () => {
  const fetchServiceByRoute = async (routeId: number) => {
    const res = await getServiceByRoute(routeId);
    return res;
  };

  return {
    fetchServiceByRoute,
  };
};

export default useServiceService;
