import Http from '@web/services/api/Http';
import { StoreOptions } from 'vuex';

interface testData {
  data: string;
}

export default () => ({
  namespace: true,
  state: (): testData => ({
    data: '',
  }),
  mutations: {
    init: (store: testData, str: string ) => {
      store.data = str;
    },
  },
  actions: {
    fetchItem: async ({commit}, message: string) => {
      commit('init', await Http.get<string>(`fake/${message}`));
    },
  },

}) as StoreOptions<any>;
