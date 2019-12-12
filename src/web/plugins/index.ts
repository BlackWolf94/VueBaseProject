import {PluginObject} from 'vue';
import { Store } from 'vuex';
import VuetifyPlugins from '@web/plugins/vuetify/VuetifyPlugins';

export default function loadPlugins(store: Store<any>, vuetify: any): PluginObject<any> {
    return {
        install(Vue) {
            Vue.use(VuetifyPlugins, {store, vuetify});
        },
    };
}
