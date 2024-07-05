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

export {getTrips};
