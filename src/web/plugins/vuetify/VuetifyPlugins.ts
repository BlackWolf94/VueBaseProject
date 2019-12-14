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

        Object.defineProperty(vm.prototype, '$dialog', {
            value(name: string)  {
                const store = this.$store;
                const vuetify = this.$vuetify;
                console.error('asdas');

                return {
                    // base: (title: string) =>  new DialogBuilder(store, vuetify, name)
                    //   .title(title)
                    //   .buttonCancel(this.$t('Close'))
                    //   .buttonOk(this.$t('OK'), null, 'primary'),
                    // confirm: (title: string) =>  new DialogBuilder(store, vuetify, name).title(title),
                    // alert: (title: string) =>  new DialogBuilder(store, vuetify, name).title(title),
                    // prompt: (title: string) =>  new DialogBuilder(store, vuetify, name).title(title),
                    // info: (title: string) =>  new DialogBuilder(store, vuetify, name).title(title),
                    // error: (title: string) =>  new DialogBuilder(store, vuetify, name).title(title),
                };
            }
        });


        const progress = new ProgressBarBuilder('AppProgressBar');
        Object.defineProperty(vm.prototype, '$appProgress', {
            get() {
                return {
                    show: () => progress.show(),
                    hide: () => progress.hide()
                };
            }
        });


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
