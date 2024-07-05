import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

const useServiceStore = create((set, get) => ({
  quantities: {},
  total: 511,
  async initializeQuantities(data) {
    try {
      const storedQuantities = await AsyncStorage.getItem('quantities');
      if (storedQuantities) {
        set({quantities: JSON.parse(storedQuantities)});
      } else {
        const initialQuantities = data.reduce(
          (acc, item) => ({...acc, [item.id]: 0}),
          {},
        );
        await AsyncStorage.setItem(
          'quantities',
          JSON.stringify(initialQuantities),
        );
        set({quantities: initialQuantities});
      }
    } catch (error) {
      console.error('Error initializing quantities:', error);
    }
  },
  async incrementService(id, price) {
    try {
      const newQuantities = {
        ...get().quantities,
        [id]: get().quantities[id] + 1,
      };
      await AsyncStorage.setItem('quantities', JSON.stringify(newQuantities));
      set(state => ({
        quantities: newQuantities,
        total: state.total + price,
      }));
    } catch (error) {
      console.error('Error incrementing service:', error);
    }
  },
  async decrementService(id, price) {
    try {
      if (get().quantities[id] > 0) {
        const newQuantities = {
          ...get().quantities,
          [id]: get().quantities[id] - 1,
        };
        await AsyncStorage.setItem('quantities', JSON.stringify(newQuantities));
        set(state => ({
          quantities: newQuantities,
          total: state.total - price,
        }));
      }
    } catch (error) {
      console.error('Error decrementing service:', error);
    }
  },
}));

export default useServiceStore;
