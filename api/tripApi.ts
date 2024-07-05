import axiosClient from '@/config/axiosClient';

const getTrips = (
  tripStartPoint: number,
  tripEndPoint: number,
  tripStartDate: string | Date,
) => {
  return axiosClient.get('/api/trips', {
    params: {
      'trip-start-point': tripStartPoint,
      'trip-end-point': tripEndPoint,
      'trip-start-date': tripStartDate,
    },
  });
};

const getTripDetail = (tripId: number) => {
  return axiosClient.get(`/api/trips/${tripId}`);
};

export {getTrips, getTripDetail};
