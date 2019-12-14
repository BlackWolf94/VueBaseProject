import { PluginObject, VueConstructor } from 'vue';
import DialogBuilder from '@web/plugins/vuetify/dialog/builder/DialogBuilder';
import ProgressBarBuilder from '@web/plugins/vuetify/dialog/builder/ProgressBarBuilder';
import vuetify from '../vuetify';

export default {
  install(vm: VueConstructor) {

    Object.defineProperty(vm.prototype, '$dialog', {
      value(name: string) {
        const store = this.$store;

        return {
          confirm: (title: string, text: string) => new DialogBuilder(store, vuetify, name)
            .title(title, 'primary')
            .buttonCancel(this.$t('Close'))
            .text(text)
            .buttonOk(this.$t('OK'), null, 'primary'),
          alert: (text: string, title: string) =>  new DialogBuilder(store, vuetify, name)
            .title(title || this.$t('Alert'), 'warning'),
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
  }
} as  PluginObject<any>;

