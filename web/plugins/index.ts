import {PluginObject} from 'vue';
import Dialog from "@web/plugins/dialog/Dialog";

export default {
    install(Vue) {
        Vue.use(Dialog, {store: this.store, vuetify: this.$vuetify});
    },
} as PluginObject<any>;
