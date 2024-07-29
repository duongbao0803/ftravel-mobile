import {getRouteDetail} from '@/api/routeApi';

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
