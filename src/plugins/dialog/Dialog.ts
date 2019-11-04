import {PluginObject, VueConstructor} from 'vue';
import {Store} from 'vuex';
import DialogBuilder from '@/plugins/dialog/builder/DialogBuilder';

interface TDialogPluginOptions {
    store: Store<any>;
    vuetify: any;
}

export default {
    install: (Vue: VueConstructor, options: TDialogPluginOptions) => {

        Vue.prototype.$dialog = () =>  new DialogBuilder(options.store, options.vuetify);

        // Vue.prototype.$dialogAlert = function () {
        //     return (new DialogBuilder(options.store, options.vuetify))
        //         .title(Vue.prototype.$t('Warning!'), 'warning')
        //         .buttonOk('ok')
        // }

        // TODO add prompt / error / loading confirm dialogs
        // TODO add toast here for analogue

    },
} as PluginObject<TDialogPluginOptions>;
