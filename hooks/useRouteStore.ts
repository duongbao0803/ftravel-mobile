import {create} from 'zustand';

const useRouteStore = create(set => ({
  listRouteDetail: [],
  routeId: 0,
  setRouteId: (routeId: number) => set({routeId}),
  setRouteDetail: (listRouteDetail: any) => set({listRouteDetail}),
}));

export default useRouteStore;
