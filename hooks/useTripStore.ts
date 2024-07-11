import {create} from 'zustand';

const useTripStore = create(set => ({
  listTrip: [],
  startDate: '',
  endDate: '',
  setStartDate: startDate => set({startDate}),
  setEndDate: endDate => set({endDate}),
  selectedDeparture: '',
  selectedDestination: '',
  busCompany: '',
  setBusCompanyName: busCompany => set({busCompany}),
  setDeparture: selectedDeparture => set({selectedDeparture}),
  setDestination: selectedDestination => set({selectedDestination}),
  setTrip: listTrip => set({listTrip}),
}));

export default useTripStore;
