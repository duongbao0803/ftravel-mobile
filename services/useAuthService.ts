import {getInfoUser, updatePersonalInfo} from '@/api/authApi';
import {UpdateUser, UserInfo} from '@/types/auth.types';
import {useQuery} from 'react-query';

const useAuthService = () => {
  const fetchUserInfo = async (): Promise<UserInfo | undefined> => {
    try {
      const res = await getInfoUser();
      if (res && res.status === 200) {
        const userInfo: UserInfo = res.data;
        if (userInfo) {
          return userInfo;
        }
      }
    } catch (err) {
      console.error('Error fetching userInfo', err);
    }
  };

  const updateInforUser = async (id: number, formValues: UpdateUser) => {
    try {
      const res = await updatePersonalInfo(id, formValues);
      console.log('check res', res);
    } catch (err) {
      console.error('Error fetching userInfo', err);
    }
  };

  const {data: userInfo, isLoading: isFetching} = useQuery(
    'userInfo',
    fetchUserInfo,
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  return {
    isFetching,
    userInfo,
    fetchUserInfo,
    updateInforUser,
  };
};

export default useAuthService;
