import {PluginObject} from 'vue';
import Dialog from '@/plugins/dialog/Dialog';
import store from '@/store';
import vuetify from './vuetify';

export default {
    install: (Vue) => {
        Vue.use(Dialog, {store, vuetify});
    },
} as PluginObject<any>;
