/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 12.12.19
 */

import { Store } from 'vuex';
import Vue from 'vue';
import ProgressBar from '@web/plugins/vuetify/dialog/components/ProgressBar.vue';

export default class ProgressBarBuilder {
  private progress: ProgressBar;

  constructor(private store: Store<any>, private vuetify: any, private name: string) {
    // this.progress = new (Vue.extend(ProgressBar))();
    // this.progress.$mount();

  }

  hide() {
    (this.progress as any).isShow = false;
  }

  show() {
    document.getElementById('app').appendChild(this.progress.$el);
    (this.progress as any).isShow = true;
  }
}
