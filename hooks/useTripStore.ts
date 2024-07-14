import {TripState} from '@/types/trip.types';
import {create} from 'zustand';

const useTripStore = create<TripState>(set => ({
  listTrip: [],
  startDate: '',
  endDate: '',
  setStartDate: (startDate: string | Date) => set({startDate}),
  setEndDate: (endDate: string | Date) => set({endDate}),
  selectedDeparture: '',
  selectedDestination: '',
  busCompany: '',
  setBusCompanyName: (busCompany: string) => set({busCompany}),
  setDeparture: (selectedDeparture: string) => set({selectedDeparture}),
  setDestination: (selectedDestination: string) => set({selectedDestination}),
  setTrip: (listTrip: any) => set({listTrip}),
}));

export default useTripStore;
