import {ServiceState} from '@/types/service.types';
import {create} from 'zustand';

const useServiceStore = create<ServiceState>((set, get) => ({
  seatCode: '',
  tripId: 0,
  quantities: {},
  total: 0,
  listService: [],
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

  incrementService(id, price) {
    const quantities = get().quantities;
    const currentQuantity = quantities[id] || 0;
    const newQuantities = {...quantities, [id]: currentQuantity + 1};

    set(state => ({
      quantities: newQuantities,
      total: state.total + price,
      listService: state.listService.map(service =>
        service.id === id ? {...service, quantity: newQuantities[id]} : service,
      ),
    }));

    get().updateSelectedServices();
  },

  decrementService(id, price) {
    const quantities = get().quantities;
    const currentQuantity = quantities[id] || 0;

    if (currentQuantity > 0) {
      const newQuantities = {...quantities, [id]: currentQuantity - 1};

      set(state => ({
        quantities: newQuantities,
        total: state.total - price,
        listService: state.listService.map(service =>
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
      .filter(service => quantities[service.id] > 0)
      .map(service => ({
        id: service.id,
        name: service.name,
        quantity: quantities[service.id],
      }));

    set({selectedServices});
  },

  setListService(services) {
    const updatedListService = services.filter(
      service => service.quantity !== undefined && service.quantity !== 0,
    );
    set({listService: updatedListService});
    get().updateSelectedServices();
  },
}));

export default useServiceStore;
