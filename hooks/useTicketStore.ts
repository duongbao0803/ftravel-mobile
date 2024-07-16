import {TicketState} from '@/types/ticket.types';
import {create} from 'zustand';

const useTicketStore = create<TicketState>(set => ({
  ticketId: 0,
  setTicketId: ticketId => set({ticketId}),
  ticketInfo: {},
  setTicketInfo: (ticketInfo: any) => set({ticketInfo}),
  isLoadingNewTicket: true,
  setIsLoadingNewTicket: (isLoadingNewTicket: boolean) =>
    set({isLoadingNewTicket}),
}));

export default useTicketStore;
