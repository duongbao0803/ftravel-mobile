import {useQuery} from 'react-query';
import {getNotification} from '@/api/notificationApi';

const useNotificationService = () => {
  const fetchNotices = async () => {
    const res = await getNotification();
    return res.data;
  };

  const {data: noticeData, isLoading: isFetching} = useQuery(
    'notifications',
    fetchNotices,
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  return {
    isFetching,
    noticeData,
  };
};

export default useNotificationService;
