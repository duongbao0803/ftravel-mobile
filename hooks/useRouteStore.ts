import {create} from 'zustand';

const useRouteStore = create(set => ({
  listRouteDetail: [],
  setRouteDetail: listRouteDetail => set({listRouteDetail}),
}));

export default useRouteStore;
