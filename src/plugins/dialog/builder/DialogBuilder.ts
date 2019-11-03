/**
 * @author Dmytro Zataidukh
 * @created_at 11/3/19
 */
import {TDialogButtons, TDialogProperty} from '@/plugins/dialog/builder/IDialogBuilder';
import {TObject} from '@/types/IGeneral';
import Vue, {Component} from 'vue';
import Dialog from '@/plugins/dialog/components/Dialog.vue';

export default class DialogBuilder {

    public close: () => void;
    private cancel: TDialogButtons = null;
    private ok: TDialogButtons = null;

    private computed: TDialogProperty = {
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

    constructor(private store?: any) {
    }

    public model(value: any): this {
        this.data.value = Object.assign(Object.create(Object.getPrototypeOf(value)), value);
        return this;
    }

    public text(text: string): this {
        this.computed.text = () => text;
        return this;
    }

    public title(text: string, color?: string, icon?: string): this {
        this.computed.title = () => ({text, color, icon});
        return this;
    }

    public buttonOk(text: string, icon?: string, color?: string): this {
        this.ok = {text, icon, color};
        return this;
    }

    public buttonCancel(text: string, icon?: string, color?: string): this {
        this.cancel = {text, icon, color};
        return this;
    }

    public component(component: Component, props: any = {}): this {
        this.computed.component = () => component;
        this.computed.componentProps = () => props;
        return this;
    }


    public show<T = any>(): Promise<T> {
        return new Promise<T>((resolve, reject) => {

            let dialog = new (Vue.extend(Dialog))({
                computed: this.computed,
                data: () => this.data,
            });

            this.close = () => {
                if (!dialog) {
                    return;
                }

                dialog.$destroy();
                dialog = null;
                reject();
            };

            if (this.cancel) {
                this.cancel.actions = () => {
                    this.close();
                };
            }

            if (this.ok) {
                this.ok.actions = () => {
                    dialog.$destroy();
                    resolve(dialog.value);
                };
            }
        });
    }

}
