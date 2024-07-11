import {create} from 'zustand';

const useRouteStore = create(set => ({
  listRouteDetail: [],
  routeId: 0,
  setRouteId: routeId => set({routeId}),
  setRouteDetail: listRouteDetail => set({listRouteDetail}),
}));

export default useRouteStore;
