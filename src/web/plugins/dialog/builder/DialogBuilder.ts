/**
 * @author Dmytro Zataidukh
 * @created_at 11/3/19
 */
import {IDialogButtons, IDialogProperty} from '@web/plugins/dialog/builder/IDialogBuilder';
import {TObject} from '@web/types/IGeneral';
import Vue, {Component} from 'vue';
import Dialog from '@web/plugins/dialog/Dialog';

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
            this.ok,
        ]).filter((btn) => !!btn),
    };

    private data: TObject = {
        value: null,
    };

    constructor(private store: any, private vuetify: any) {
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
        this.computed.title = () => ({text, color, icon});
        return this;
    }

    buttonOk(text: string, icon?: string, color?: string): this {
        this.ok = {text, icon, color};
        return this;
    }

    buttonCancel(text: string, icon?: string, color?: string): this {
        this.cancel = {text, icon, color};
        return this;
    }

    component(component: Component, props: any = {}): this {
        this.computed.component = () => component;
        this.computed.componentProps = () => props;
        return this;
    }


    show<T = any>(): Promise<T> {
        return new Promise<T>((resolve, reject) => {

            let dialog = new (Vue.extend(Dialog))({
                computed: this.computed,
                data: () => this.data,
                store: this.store,
                vuetify: this.vuetify,
            });

            this.close = () => {
                if (!dialog) {
                    return;
                }

                dialog.$destroy();
                document.removeChild(dialog.$el);
                dialog = null;
                reject();
            };

            if (this.cancel) {
                this.cancel.action = () => {
                    this.close();
                };
            }

            if (this.ok) {
                this.ok.action = () => {
                    dialog.$destroy();
                    document.removeChild(dialog.$el);
                    resolve(dialog.value);
                };
            }

            dialog.$mount();
            document.appendChild(dialog.$el);
        });
    }

}
