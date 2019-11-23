/**
 * @author Dmytro Zataidukh
 * @created_at 11/16/19
 */
import {Store, StoreOptions} from 'vuex';
import Http from '@web/services/api/Http';

interface IList {
    list: any[];
}

export default () => ({
    namespace: true,
    state: (): IList => ({
        list: [],
    }),
    mutations: {
        init: (store: IList, items: any[]) => {
            store.list = items;
        },
    },
    actions: {
        fetch: async ({commit}) => {
            commit('init', await Http.get<any[]>('fake'));
        },
    },

}) as StoreOptions<any>;
