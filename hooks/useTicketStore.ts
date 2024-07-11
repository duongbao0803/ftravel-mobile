import {create} from 'zustand';

const useTicketStore = create(set => ({
  ticketId: 0,
  setTicketId: ticketId => set({ticketId}),
}));

export default useTicketStore;
