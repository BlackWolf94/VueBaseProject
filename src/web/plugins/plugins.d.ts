/**
 * @author Dmytro Zataidukh
 * @created_at 11/3/19
 */
import Vue from 'vue';
import {VuetifyLocale} from 'vuetify/types/services/lang';
import DialogBuilder from '@web/plugins/vuetify/dialog/builder/DialogBuilder';

declare module 'vue/types/vue' {


    // tslint:disable-next-line:interface-name
    interface Vue {
        $currentLang: string;
        $appProgress: {show(): void; hide(): void };

        $t(key: string, ...params: Array<string | number>): string;
        $addLocale(lang: string, translates: VuetifyLocale): void;
        $setLocale(lang: string): void;

        $dialog(name: string): {
            base(text: string): DialogBuilder;
            confirm(text: string, title?: string): DialogBuilder;
            warn(text: string, title?: string): DialogBuilder;
            prompt(text: string, title?: string): DialogBuilder;
            info(text: string, title?: string): DialogBuilder;
            error(text: string, title?: string): DialogBuilder;
            success(text: string, title?: string): DialogBuilder;
            // prompt(title?: string, component: any): DialogBuilder;
        };
    }
}

