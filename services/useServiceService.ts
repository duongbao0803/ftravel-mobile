import {getDetailService, getServiceByRoute} from '@/api/serviceApi';
import {useQuery} from 'react-query';

const useServiceService = () => {
  const fetchServiceByRoute = async (routeId: number) => {
    const res = await getServiceByRoute(routeId);
    return res;
  };
  const getServiceInfo = async (serviceId: number) => {
    const res = await getDetailService(serviceId);
    return res.data;
  };

  const fetchMultipleServices = async (serviceIds: number[]) => {
    const promises = serviceIds.map(id => getServiceInfo(id));
    return Promise.all(promises);
  };

  const useServiceQuery = (serviceIds: number[]) => {
    return useQuery(
      ['services', serviceIds],
      () => fetchMultipleServices(serviceIds),
      {
        keepPreviousData: true,
        staleTime: 300000,
        enabled: serviceIds.length > 0,
      },
    );
  };

  return {
    fetchServiceByRoute,
    useServiceQuery,
  };
};

export default useServiceService;
