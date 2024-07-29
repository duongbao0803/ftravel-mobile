import {useQuery} from 'react-query';
import {getCities} from '@/api/cityApi';

const useCityService = () => {
  const fetchCities = async () => {
    const res = await getCities();
    return res.data;
  };

  const {data: cityData, isLoading: isFetching} = useQuery(
    'cities',
    fetchCities,
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  return {
    isFetching,
    cityData,
  };
};

export default useCityService;
