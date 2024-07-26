import {TicketTripInfo} from './ticket.types';

export interface TripInfo {
  key: string;
  id: number;
  name: string;
  'route-id'?: number;
  'route-name': string;
  'bus-company-id'?: number;
  'bus-company-name'?: string;
  'open-ticket-date'?: string | Date;
  'estimated-start-date'?: string | Date;
  'estimated-end-date'?: string | Date;
  'actual-start-date'?: string | Date;
  'actual-end-date'?: string | Date;
  'is-template': boolean;
  'driver-id': number;
  'create-date'?: string | Date;
  'update-date'?: string | Date;
  'is-deleted'?: boolean;
  status: string;
}

export interface TripDetailInfo extends TripInfo {
  tickets: [TicketTripInfo];
}

export interface TripState {
  listTrip: any[];
  startDate: string | Date;
  endDate: string | Date;
  selectedDeparture: string;
  selectedDestination: string;
  busCompany: string;
  date: string | Date;
  setStartDate: (startDate: string | Date) => void;
  setEndDate: (endDate: string | Date) => void;
  setBusCompanyName: (busCompany: string) => void;
  setDeparture: (selectedDeparture: string) => void;
  setDestination: (selectedDestination: string) => void;
  setTrip: (listTrip: any[]) => void;
  setDate: (date: string | Date) => void;
}
