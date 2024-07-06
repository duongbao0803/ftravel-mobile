import {getInfoUser, updatePersonalInfo} from '@/api/authApi';
import {UpdateUser, UserInfo} from '@/types/auth.types';
import {CustomError} from '@/types/error.types';
import {ToastAndroid} from 'react-native';
import {useMutation, useQuery, useQueryClient} from 'react-query';

const useAuthService = () => {
  const queryClient = useQueryClient();

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

  const updateInforUser = async (formValues: UpdateUser) => {
    const res = await updatePersonalInfo(formValues);
    return res;
  };

  const {data: userInfo, isLoading: isFetching} = useQuery(
    'userInfo',
    fetchUserInfo,
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const updateUserInfoMutation = useMutation(updateInforUser, {
    onSuccess: res => {
      ToastAndroid.show(`${res.data.message}`, ToastAndroid.CENTER);
      queryClient.invalidateQueries('userInfo');
    },
    onError: (err: CustomError) => {},
  });

  const updateUserItem = async (formValues: UpdateUser) => {
    await updateUserInfoMutation.mutateAsync(formValues);
  };

  return {
    isFetching,
    userInfo,
    fetchUserInfo,
    updateInforUser,
    updateUserItem,
  };
};

export default useAuthService;
