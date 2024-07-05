import {getCities} from '@/api/cityApi';
import {getRouteDetail} from '@/api/routeApi';
import {getTrips} from '@/api/tripApi';
import {useQuery} from 'react-query';

const useRouteService = () => {
  const fetchRouteDetail = async (routeId: number) => {
    const res = await getRouteDetail(routeId);
    return res.data;
  };

  return {
    fetchRouteDetail,
  };
};

export default useRouteService;
