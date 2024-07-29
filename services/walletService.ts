import {useMutation, useQuery} from 'react-query';
import {chargeToken, getBalances, getTransactions} from '@/api/walletApi';
import {CustomError} from '@/types/error.types';
import {ChargeToken} from '@/types/wallet.types';

const useWalletService = (queryClient: any) => {
  const fetchBalances = async () => {
    const res = await getBalances();
    return res.data;
  };

  const fetchTransaction = async (page: number, walletId: number) => {
    const res = await getTransactions(page, walletId);
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
    onError: (err: CustomError) => {},
  });

  const chargeTokenItem = async (formValues: ChargeToken) => {
    const res = await chargeTokenMutation.mutateAsync(formValues);
    queryClient.invalidateQueries('balances');
    queryClient.invalidateQueries('transactions');
    return res;
  };

  const useTransactionQuery = (page: number, walletId: number) => {
    return useQuery(
      ['transactions', page, walletId],
      () => fetchTransaction(page, walletId),
      {
        keepPreviousData: true,
        staleTime: 300000,
      },
    );
  };

  return {
    isFetching,
    balanceData,
    chargeTokenItem,
    useTransactionQuery,
  };
};

export default useWalletService;
