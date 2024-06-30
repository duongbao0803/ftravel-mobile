import {create} from 'zustand';

const useServiceStore = create(set => ({
  quantities: {},
  total: 511,
  initializeQuantities: (data: any[]) =>
    set({
      quantities: data.reduce((acc, item) => ({...acc, [item.id]: 0}), {}),
    }),
  incrementService: (id: string | number, price: any) =>
    set((state: {quantities: {[x: string]: number}; total: any}) => {
      const newQuantities = {
        ...state.quantities,
        [id]: state.quantities[id] + 1,
      };
      const newTotal = state.total + price;
      return {quantities: newQuantities, total: newTotal};
    }),
  decrementService: (id: string | number, price: number) =>
    set((state: {quantities: {[x: string]: number}; total: number}) => {
      if (state.quantities[id] > 0) {
        const newQuantities = {
          ...state.quantities,
          [id]: state.quantities[id] - 1,
        };
        const newTotal = state.total - price;
        return {quantities: newQuantities, total: newTotal};
      }
      return state;
    }),
}));

export default useServiceStore;
