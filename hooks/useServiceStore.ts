// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {create} from 'zustand';

// const useServiceStore = create((set, get) => ({
//   seatCode: '',
//   tripId: 0,
//   setTripId: tripId => set({tripId}),
//   quantities: {},
//   total: 0,
//   setSeatCode: seatCode => set({seatCode}),
//   setTotal: total => set({total}),
//   async initializeQuantities(data) {
//     try {
//       const storedQuantities = await AsyncStorage.getItem('quantities');
//       if (storedQuantities) {
//         set({quantities: JSON.parse(storedQuantities)});
//       } else {
//         const initialQuantities = data.reduce(
//           (acc, item) => ({...acc, [item.id]: 0}),
//           {},
//         );
//         await AsyncStorage.setItem(
//           'quantities',
//           JSON.stringify(initialQuantities),
//         );
//         set({quantities: initialQuantities});
//       }
//     } catch (error) {
//       console.error('Error initializing quantities:', error);
//     }
//   },
//   async incrementService(id, price) {
//     try {
//       const quantities = get().quantities;
//       const currentQuantity = quantities[id] || 0; // Đảm bảo currentQuantity là số
//       const newQuantities = {
//         ...quantities,
//         [id]: currentQuantity + 1,
//       };
//       await AsyncStorage.setItem('quantities', JSON.stringify(newQuantities));
//       set(state => ({
//         quantities: newQuantities,
//         total: state.total + price,
//       }));
//     } catch (error) {
//       console.error('Error incrementing service:', error);
//     }
//   },
//   async decrementService(id, price) {
//     try {
//       const quantities = get().quantities;
//       const currentQuantity = quantities[id] || 0; // Đảm bảo currentQuantity là số
//       if (currentQuantity > 0) {
//         const newQuantities = {
//           ...quantities,
//           [id]: currentQuantity - 1,
//         };
//         await AsyncStorage.setItem('quantities', JSON.stringify(newQuantities));
//         set(state => ({
//           quantities: newQuantities,
//           total: state.total - price,
//         }));
//       }
//     } catch (error) {
//       console.error('Error decrementing service:', error);
//     }
//   },
//   async resetQuantities() {
//     try {
//       await AsyncStorage.removeItem('quantities');
//       set({quantities: {}, total: 0});
//     } catch (error) {
//       console.error('Error resetting quantities:', error);
//     }
//   },
// }));

// export default useServiceStore;

import {create} from 'zustand';

const useServiceStore = create((set, get) => ({
  seatCode: '',
  tripId: 0,
  setTripId: tripId => set({tripId}),
  quantities: {},
  total: 0,
  listService: [],
  setListService: listService => set({listService}),
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
    const newQuantities = {
      ...quantities,
      [id]: currentQuantity + 1,
    };
    set(state => ({
      quantities: newQuantities,
      total: state.total + price,
    }));
  },
  decrementService(id, price) {
    const quantities = get().quantities;
    const currentQuantity = quantities[id] || 0;
    if (currentQuantity > 0) {
      const newQuantities = {
        ...quantities,
        [id]: currentQuantity - 1,
      };
      set(state => ({
        quantities: newQuantities,
        total: state.total - price,
      }));
    }
  },
  resetQuantities() {
    set({quantities: {}});
  },

  getSelectedServices(serviceList) {
    const quantities = get().quantities;
    return serviceList
      ?.filter(service => quantities[service?.id] > 0)
      ?.map(service => ({
        id: service?.id,
        name: service?.name,
        quantity: quantities[service?.id],
      }));
  },
}));

export default useServiceStore;
