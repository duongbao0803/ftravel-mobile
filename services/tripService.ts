import {getTripDetail, getTrips} from '@/api/tripApi';

const useTripService = () => {
  const fetchTrips = async (
    tripStartPoint: number,
    tripEndPoint: number,
    tripStartDate: string | Date,
  ) => {
    const res = await getTrips(tripStartPoint, tripEndPoint, tripStartDate);
    return res;
  };

  const fetchTripDetail = async (tripId: number) => {
    const res = await getTripDetail(tripId);
    return res.data;
  };

  return {
    fetchTrips,
    fetchTripDetail,
  };
};

export default useTripService;
