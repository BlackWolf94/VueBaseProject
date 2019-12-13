import { PluginObject } from 'vue';
import VuetifyPlugins from '@web/plugins/vuetify/VuetifyPlugins';

export default {
  install(Vue) {
    console.error('install');
    Vue.use(VuetifyPlugins);
  }
} as PluginObject<any>;
