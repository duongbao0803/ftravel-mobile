import {create} from 'zustand';

const useServiceStore = create((set, get) => ({
  seatCode: '',
  tripId: 0,
  setTripId: (tripId: number) => set({tripId}),
  quantities: {},
  total: 0,
  listService: [],
  selectedServices: [],
  setSelectedServices: (services: any) => set({selectedServices: services}),
  setSeatCode: (seatCode: string) => set({seatCode}),
  setTotal: (total: number) => set({total}),
  initializeQuantities(data: any[]) {
    const initialQuantities = data.reduce(
      (acc: any, item: {id: any}) => ({...acc, [item.id]: 0}),
      {},
    );
    set({quantities: initialQuantities});
  },
  incrementService(id: number, price: number) {
    const quantities = get().quantities;
    const currentQuantity = quantities[id] || 0;
    const newQuantities = {
      ...quantities,
      [id]: currentQuantity + 1,
    };
    set((state: {total: number; listService: any[]}) => ({
      quantities: newQuantities,
      total: state.total + price,
      listService: state.listService.map((service: {id: any}) =>
        service.id === id ? {...service, quantity: newQuantities[id]} : service,
      ),
    }));
    get().updateSelectedServices();
  },
  decrementService(id: number, price: number) {
    const quantities = get().quantities;
    const currentQuantity = quantities[id] || 0;
    if (currentQuantity > 0) {
      const newQuantities = {
        ...quantities,
        [id]: currentQuantity - 1,
      };
      set((state: {total: number; listService: any[]}) => ({
        quantities: newQuantities,
        total: state.total - price,
        listService: state.listService.map((service: {id: any}) =>
          service.id === id
            ? {...service, quantity: newQuantities[id]}
            : service,
        ),
      }));
      get().updateSelectedServices();
    }
  },
  resetQuantities() {
    set({quantities: {}});
  },
  updateSelectedServices() {
    const quantities = get().quantities;
    const services = get().listService;
    const selectedServices = services
      .filter((service: {id: number}) => quantities[service.id] > 0)
      .map((service: {id: number; name: any}) => ({
        id: service.id,
        name: service.name,
        quantity: quantities[service.id],
      }));
    set({selectedServices});
  },
  setListService: (services: any) => {
    set({listService: services});
    get().updateSelectedServices();
  },
}));

export default useServiceStore;
