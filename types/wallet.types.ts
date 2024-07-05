export interface WalletInfo {
  'customer-id': number;
  'customer-name': string;
  'account-balance': number;
  status: string;
  id: number;
  'create-date': Date | string;
  'update-date': Date | string;
  'is-deleted': false;
}

export interface ChargeToken {
  'recharge-amount': number;
  'payment-method': string;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
}

export interface TransactionState {
  transaction: Transaction | null;
  setTransaction: (transaction: Transaction) => void;
}
