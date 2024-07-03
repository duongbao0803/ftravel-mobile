import {chargeToken, getBalances} from '@/api/walletApi';
import {UserInfo} from '@/types/auth.types';
import {CustomError} from '@/types/error.types';
import {ChargeToken} from '@/types/wallet.types';
import {router} from 'expo-router';
import {useMutation, useQuery, useQueryClient} from 'react-query';

const useWalletService = (queryClient: any) => {
  const fetchBalances = async () => {
    const res = await getBalances();
    return res.data;
  };

  const chargeTokenCustomer = async (formValues: ChargeToken) => {
    const res = await chargeToken(formValues);
    return res;
  };

  const {data: balanceData, isLoading: isFetching} = useQuery(
    'balances',
    fetchBalances,
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const chargeTokenMutation = useMutation(chargeTokenCustomer, {
    onSuccess: res => {
      queryClient.invalidateQueries('balances');
    },
    onError: (err: CustomError) => {
      // console.log('check err', err);
    },
  });

  const chargeTokenItem = async (formValues: ChargeToken) => {
    const res = await chargeTokenMutation.mutateAsync(formValues);
    queryClient.invalidateQueries('balances');
    return res;
  };

  return {
    isFetching,
    balanceData,
    chargeTokenItem,
  };
};

export default useWalletService;
