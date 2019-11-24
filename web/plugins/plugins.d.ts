/**
 * @author Dmytro Zataidukh
 * @created_at 11/3/19
 */
import Vue from 'vue';
import {VuetifyLocale} from 'vuetify/types/services/lang';
import DialogBuilder from '@web/plugins/dialog/builder/DialogBuilder';

declare module 'vue/types/vue' {
    interface Vue {
        $currentLang: string;
        $t(key: string, ...params: Array<string | number>): string;
        $addLocale(lang: string, translates: VuetifyLocale): void;
        $dialog(): DialogBuilder;
        $setLocale(lang: string): void;
    }
}

