import {create} from 'zustand';

const useTripStore = create(set => ({
  listTrip: [],
  selectedDeparture: '',
  selectedDestination: '',
  setDeparture: selectedDeparture => set({selectedDeparture}),
  setDestination: selectedDestination => set({selectedDestination}),
  setTrip: listTrip => set({listTrip}),
}));

export default useTripStore;
