import {Transaction, TransactionState} from '@/types/wallet.types';
import {create} from 'zustand';

const useTransaction = create<TransactionState>(set => ({
  transaction: null,
  setTransaction: (transaction: Transaction) => set({transaction}),
  isLoadingTransaction: true,
}));

export default useTransaction;
