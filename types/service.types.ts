export interface Service {
  id: number;
  name: string;
  quantity: number;
}

export interface ServiceState {
  seatCode: string;
  tripId: number;
  quantities: Record<number, number>;
  total: number;
  listService: Service[];
  selectedServices: Service[];

  setTripId: (tripId: number) => void;
  setSelectedServices: (services: Service[]) => void;
  setSeatCode: (seatCode: string) => void;
  setTotal: (total: number) => void;
  initializeQuantities: (data: {id: number}[]) => void;
  incrementService: (id: number, price: number) => void;
  decrementService: (id: number, price: number) => void;
  resetQuantities: () => void;
  updateSelectedServices: () => void;
  setListService: (services: Service[]) => void;
}
