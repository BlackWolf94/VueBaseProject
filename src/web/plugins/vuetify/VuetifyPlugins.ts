import Vue, { PluginObject, VueConstructor } from 'vue';
import DialogBuilder from '@web/plugins/vuetify/dialog/builder/DialogBuilder';
import ProgressBarBuilder from '@web/plugins/vuetify/dialog/builder/ProgressBarBuilder';
import vuetify from '../vuetify';

export default {
  install(vm: VueConstructor) {

    Object.defineProperty(Vue.prototype, '$dialog', {
      value(name: string) {
        const store = this.$store;

        return {
          confirm: (text: string, title?: string) => new DialogBuilder(store, vuetify, name)
            .buttonCancel(this.$t('Close'))
            .buttonOk(this.$t('OK'), null, 'primary')
            .title(title || this.$t('Confirm'), 'primary')
            .text(text),

          warn: (text: string, title?: string) => new DialogBuilder(store, vuetify, name)
            .text(text)
            .title(title || this.$t('Warning'), 'warning', 'mdi-bell-warn-outline')
            .buttonOk(this.$t('OK'), null, 'primary'),

          info: (text: string, title?: string) => new DialogBuilder(store, vuetify, name)
            .text(text)
            .title(title || this.$t('Info'), 'primary', 'mdi-information')
            .buttonOk(this.$t('OK'), null, 'primary'),

          error: (text: string, title?: string) => new DialogBuilder(store, vuetify, name)
            .text(text)
            .title(title || this.$t('Error'), 'error', 'mdi-alert-decagram')
            .buttonOk(this.$t('OK'), null, 'primary'),

          success: (text: string, title?: string) => new DialogBuilder(store, vuetify, name)
            .text(text)
            .title(title || this.$t('Success'), 'success', 'mdi-check-outline')
            .buttonOk(this.$t('OK'), null, 'primary'),

          base: (text: string ) => new DialogBuilder(store, vuetify, name)
            .text(text)
            .buttonOk(this.$t('OK'), null, 'primary')
        };
      }
    });


    const progress = new ProgressBarBuilder('AppProgressBar');
    Object.defineProperty(Vue.prototype, '$appProgress', {
      get() {
        return {
          show: () => progress.show(),
          hide: () => progress.hide()
        };
      }
    });
  }
} as PluginObject<any>;

