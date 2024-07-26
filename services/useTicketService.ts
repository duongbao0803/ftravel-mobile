import {getAllTicket, getDetailTicket} from '@/api/ticketApi';
import {useQuery} from 'react-query';

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

  const {
    data: ticketData,
    isLoading: isFetching,
    refetch,
  } = useQuery('tickets', () => fetchMyTickets(1), {
    retry: 3,
    retryDelay: 5000,
  });

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
    fetchMyTickets,
    refetch,
  };
};

export default useTicketService;
