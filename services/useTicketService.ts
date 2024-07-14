import {orderedTicket} from '@/api/orderApi';
import {getAllTicket, getDetailTicket} from '@/api/ticketApi';
import {chargeToken, getBalances, getTransactions} from '@/api/walletApi';
import {UserInfo} from '@/types/auth.types';
import {CustomError} from '@/types/error.types';
import {ChargeToken} from '@/types/wallet.types';
import {useMutation, useQuery, useQueryClient} from 'react-query';

const useTicketService = () => {
  const fetchMyTickets = async (page: number) => {
    const res = await getAllTicket(page);
    const {data, headers} = res;
    const pagination = JSON.parse(headers['x-pagination']);
    const totalCount = pagination.TotalCount;
    return {data, totalCount};
  };

  const fetchTicketDetail = async (ticketId: number) => {
    const res = await getDetailTicket(ticketId);
    return res.data;
  };

  const {data: ticketData, isLoading: isFetching} = useQuery(
    'tickets',
    () => fetchMyTickets(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const useTicketDetailQuery = (ticketId: number) => {
    return useQuery(
      ['ticketDetail', ticketId],
      () => fetchTicketDetail(ticketId),
      {
        keepPreviousData: true,
        staleTime: 300000,
      },
    );
  };

  const tickets = ticketData?.data || [];
  const totalCount = ticketData?.totalCount || 0;

  return {
    isFetching,
    tickets,
    totalCount,
    useTicketDetailQuery,
  };
};

export default useTicketService;
