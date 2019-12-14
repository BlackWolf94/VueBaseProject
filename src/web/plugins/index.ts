import { PluginObject } from 'vue';
import vuetifyPlugin from '@web/plugins/vuetify/VuetifyPlugins';

export default {
  install(Vue) {
    Vue.use( vuetifyPlugin);
  }
} as PluginObject<any>;
