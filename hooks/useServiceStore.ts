import {create} from 'zustand';

interface ServiceState {
  currentList: any;
  seatCode: string;
  tripId: number;
  quantities: Record<number, number>;
  total: number;
  listService: {id: number; name: string; quantity: number}[];
  selectedServices: {id: number; name: string; quantity: number}[];
  setTripId: (tripId: number) => void;
  setSelectedServices: (
    services: {id: number; name: string; quantity: number}[],
  ) => void;
  setSeatCode: (seatCode: string) => void;
  setTotal: (total: number) => void;

  initializeQuantities: (
    data: {id: number; name: string; quantity: number}[],
  ) => void;
  incrementService: (id: number, name: string, price: number) => void;
  decrementService: (id: number, name: string, price: number) => void;
  resetQuantities: () => void;
  updateSelectedServices: () => void;
  setListService: (
    services: {id: number; name: string; quantity: number}[],
  ) => void;
  setCurrentListService: (
    services: {id: number; name: string; quantity: number}[],
  ) => void;
}

const useServiceStore = create<ServiceState>((set, get) => ({
  seatCode: '',
  tripId: 0,
  quantities: {},
  total: 0,
  listService: [],
  currentList: [],

  selectedServices: [],

  setTripId: tripId => set({tripId}),
  setSelectedServices: services => set({selectedServices: services}),
  setSeatCode: seatCode => set({seatCode}),
  setTotal: total => set({total}),

  initializeQuantities(data) {
    const initialQuantities = data.reduce(
      (acc, item) => ({...acc, [item.id]: 0}),
      {},
    );
    set({quantities: initialQuantities});
  },

  incrementService(id, name, price) {
    const quantities = get().quantities;
    const currentQuantity = quantities[id] || 0;
    const newQuantities = {...quantities, [id]: currentQuantity + 1};

    set(state => ({
      quantities: newQuantities,
      total: state.total + price,
      listService: [
        ...state.listService.filter(service => service.id !== id),
        {id, name, quantity: newQuantities[id]},
      ].filter(service => service.quantity > 0),
    }));

    get().updateSelectedServices();
  },

  decrementService(id, name, price) {
    const quantities = get().quantities;
    const currentQuantity = quantities[id] || 0;

    if (currentQuantity > 0) {
      const newQuantities = {...quantities, [id]: currentQuantity - 1};

      set(state => ({
        quantities: newQuantities,
        total: state.total - price,
        listService: [
          ...state.listService.filter(service => service.id !== id),
          {id, name, quantity: newQuantities[id]},
        ].filter(service => service.quantity > 0),
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
      .filter(service => quantities[service.id] > 0)
      .map(service => ({
        id: service.id,
        name: service.name,
        quantity: quantities[service.id],
      }));

    set({selectedServices});
  },

  setListService(services: any[]) {
    set({
      listService: services.map(service => ({
        ...service,
        quantity: service.quantity === 0 ? '' : service.quantity,
      })),
    });
    get().updateSelectedServices();
  },
  setCurrentListService(services: any[]) {
    set({
      currentList: services.map((service: {quantity: number}) => ({
        ...service,
        quantity: service.quantity === 0 ? '' : service.quantity,
      })),
    });
    get().updateSelectedServices();
  },
}));

export default useServiceStore;
