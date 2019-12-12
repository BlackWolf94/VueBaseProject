import {PluginObject} from 'vue';
import Dialog from '@web/plugins/dialog/Dialog';
import { Store } from 'vuex';

export default function loadPlugins(store: Store<any>, vuetify: any): PluginObject<any> {
    return {
        install(Vue) {
            Vue.use(Dialog, {store, vuetify});
        },
    };
}
