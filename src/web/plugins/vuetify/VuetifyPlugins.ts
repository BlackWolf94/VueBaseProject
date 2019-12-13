import {PluginObject, VueConstructor} from 'vue';
import {Store} from 'vuex';
import DialogBuilder from '@web/plugins/vuetify/dialog/builder/DialogBuilder';
import { isClientRender } from '@web/config/config';
import ProgressBarBuilder from '@web/plugins/vuetify/dialog/builder/ProgressBarBuilder';

type TDialogPluginOptions = {
    store: Store<any>;
    vuetify: any;
};

const pluginClient: PluginObject<any> = {
    install: (vm: VueConstructor) => {

        vm.prototype.$dialog = function(name: string) {
            const store = this.$store;
            const vuetify = this.$vuetify;
            console.error('');
            const dialogs = {
                base: (title: string) =>  new DialogBuilder(store, vuetify, name)
                  .title(title)
                  .buttonCancel(this.$t('Close'))
                  .buttonOk(this.$t('OK'), null, 'primary'),
                // confirm: (title: string) =>  new DialogBuilder(store, vuetify, name).title(title),
                // alert: (title: string) =>  new DialogBuilder(store, vuetify, name).title(title),
                // prompt: (title: string) =>  new DialogBuilder(store, vuetify, name).title(title),
                // info: (title: string) =>  new DialogBuilder(store, vuetify, name).title(title),
                // error: (title: string) =>  new DialogBuilder(store, vuetify, name).title(title),
            };

            return dialogs;
        };

        // TODO add prompt / error / loading confirm dialogs
        // TODO add toast here for analogue

        const progress = new ProgressBarBuilder('AppProgressBar');
        vm.prototype.$appProgress = {
            show: () => progress.show(),
            hide: () => progress.hide()
        };
        console.error('pluginClient');

    },
};

const pluginServer: PluginObject<TDialogPluginOptions> = {
    install: (vm: VueConstructor) => {
        console.error('pluginServer');
        vm.prototype.$appProgress = {
            show: () => {},
            hide: () => {}
        };
    },
};

export default isClientRender ? pluginClient : pluginServer;
