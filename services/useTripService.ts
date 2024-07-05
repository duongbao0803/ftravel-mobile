import {getCities} from '@/api/cityApi';
import {getTrips} from '@/api/tripApi';
import {useQuery} from 'react-query';

const useTripService = () => {
  const fetchTrips = async (
    tripStartPoint: number,
    tripEndPoint: number,
    tripStartDate: string | Date,
  ) => {
    const res = await getTrips(tripStartPoint, tripEndPoint, tripStartDate);
    return res.data;
  };

  return {
    fetchTrips,
  };
};

export default useTripService;
