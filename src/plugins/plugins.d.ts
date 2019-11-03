/**
 * @author Dmytro Zataidukh
 * @created_at 11/3/19
 */
import {VuetifyLocale} from 'vuetify/types/services/lang';

declare module 'vue/types/vue' {
    interface Vue {
        $t(key: string, ...params: Array<string | number>): string;

        $addLocale(lang: string, translates: VuetifyLocale): void;
    }
}

