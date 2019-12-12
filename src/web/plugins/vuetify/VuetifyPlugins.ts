import {PluginObject, VueConstructor} from 'vue';
import {Store} from 'vuex';
import DialogBuilder from '@web/plugins/vuetify/dialog/builder/DialogBuilder';
import { isClientRender } from '@web/config/config';
import ProgressBarBuilder from '@web/plugins/vuetify/dialog/builder/ProgressBarBuilder';

type TDialogPluginOptions = {
    store: Store<any>;
    vuetify: any;
};

const pluginClient: PluginObject<TDialogPluginOptions> = {
    install: (Vue: VueConstructor, {store, vuetify}: TDialogPluginOptions) => {
        Vue.prototype.$vDialog = (name: string) =>  new DialogBuilder(store, vuetify, name);
        // Vue.prototype.$dialogAlert = function () {
        //     return (new DialogBuilder(options.store, options.vuetify))
        //         .title(Vue.prototype.$t('Warning!'), 'warning')
        //         .buttonOk('ok')
        // }

        // TODO add prompt / error / loading confirm dialogs
        // TODO add toast here for analogue

        const progress = new ProgressBarBuilder(store, vuetify, 'AppProgressBar');
        Vue.prototype.$appProgress = {
            show: () => progress.show(),
            hide: () => progress.hide()
        };

    },
};

const pluginServer: PluginObject<TDialogPluginOptions> = {
    install: (Vue: VueConstructor, {store, vuetify}: TDialogPluginOptions) => {
        Vue.prototype.$vDialog = (name: string) =>  {};
        Vue.prototype.$appProgress = {
            show: () => {},
            hide: () => {}
        };
    },
};

export default isClientRender ? pluginClient : pluginServer;
