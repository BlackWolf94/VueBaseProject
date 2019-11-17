import Vue from 'vue';
import Vuex from 'vuex';
// import sampleList from '@web/store/sampleList';

Vue.use(Vuex);

export const createStore = () =>  new Vuex.Store({
    // modules: {
    //     list: sampleList(),
    // },
    state: () => {},
    mutations: {},
    actions: {},
});
