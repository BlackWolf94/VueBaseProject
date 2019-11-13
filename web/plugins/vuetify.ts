import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.min.css';

import ru_RU from '@web/locale/ru.json';
import uk_UK from '@web/locale/uk.json';
import en_EN from '@web/locale/en.json';
import ru from 'vuetify/src/locale/ru';
import en from 'vuetify/src/locale/en';
import uk from 'vuetify/src/locale/uk';
import {VuetifyLocale} from 'vuetify/types/services/lang';

const locales: Record<string, VuetifyLocale> = {
    ru: {...ru, ...ru_RU},
    en: {...en, ...en_EN},
    uk: {...uk, ...uk_UK},
};

Vue.use(Vuetify);

Vue.prototype.$t = function(key: string, ...params: Array<string | number>): string {
    return this.$vuetify.lang.t(`$vuetify.${key}`, ...params);
};

Vue.prototype.$addLocale = function(lang: string, translates: VuetifyLocale) {
    this.$set(this.$vuetify.lang.locales, lang, {...locales[lang], ...translates});
};

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    lang: {
        locales,
        current: 'uk',
    },
});
