export interface OrderForm {
  'ticket-id': number;
  'customer-id': number;
  services: [
    {
      id: number;
      quantity: number;
    },
  ];
}
