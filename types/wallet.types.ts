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
