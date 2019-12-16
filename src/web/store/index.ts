import Vue from 'vue';
import Vuex from 'vuex';
import sampleList from '@web/store/sampleList';
import testItem from '@web/store/testItem';

Vue.use(Vuex);

export const createStore = () =>  new Vuex.Store({
    modules: {
        list: sampleList(),
        data: testItem(),
    },
    state: () => {},
    mutations: {},
    actions: {},
});
