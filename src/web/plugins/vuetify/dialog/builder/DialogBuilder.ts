/**
 * @author Dmytro Zataidukh
 * @created_at 11/3/19
 */
import { TObject } from '@web/types/IGeneral';
import Vue from 'vue';
import { Store } from 'vuex';
import { IDialogButtons, IDialogProperty } from '@web/plugins/vuetify/dialog/builder/IDialogBuilder';
import Dialog from '@web/plugins/vuetify/dialog/components/Dialog.vue';

export default class DialogBuilder {

  close: () => void;
  private cancel: IDialogButtons = null;
  private ok: IDialogButtons = null;

  private computed: IDialogProperty = {
    text: () => '',
    title: () => ({}),
    component: () => null,
    buttons: () => ([
      this.cancel,
      this.ok
    ]).filter((btn) => !!btn)
  };

  private data: TObject = {
    value: null
  };

  constructor(private store: Store<any>, private vuetify: any, private name: string) {
  }

  model(value: any): this {
    this.data.value = Object.assign(Object.create(Object.getPrototypeOf(value)), value);
    return this;
  }

  text(text: string): this {
    this.computed.text = () => text;
    return this;
  }

  title(text: string, color?: string, icon?: string): this {
    this.computed.title = () => ({ text, color, icon });
    return this;
  }

  buttonOk(text: string, icon?: string, color?: string): this {
    this.ok = { text, icon, color };
    return this;
  }

  buttonCancel(text: string, icon?: string, color?: string): this {
    this.cancel = { text, icon, color };
    return this;
  }

  component(component: any, props: any = {}): this {
    this.computed.component = () => component;
    this.computed.componentProps = () => props;
    return this;
  }

  show<T = any>(): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      let dialog = new (Vue.extend(Dialog))({
        name: `${this.name}Dialog`,
        computed: this.computed,
        data: () => this.data,
        store: this.store,
        vuetify: this.vuetify
      });

      const removeFromDOM = () => {
        document.body.removeChild(dialog.$el);
        dialog.$destroy();
        dialog = null;
      };

      this.close = () => {
        if (!dialog) {
          return;
        }
        removeFromDOM();
        reject();
      };

      if (this.cancel) {
        this.cancel.action = () => {
          this.close();
        };
      }

      if (this.ok) {
        this.ok.action = () => {
          const { value } = dialog;
          removeFromDOM();
          resolve(value);
        };
      }

      dialog.$mount();
      document.body.appendChild(dialog.$el);
    });
  }

}
