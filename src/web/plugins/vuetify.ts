import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.min.css';
import { VuetifyLocale } from 'vuetify/types/services/lang';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  lang: {
    current: 'none'
  }
});

Vue.prototype.$t = function(key: string, ...params: Array<string | number>): string {
  return this.$vuetify.lang.t(`$vuetify.${key}`, ...params);
};

Vue.prototype.$addLocale = async function(lang: string, translates: VuetifyLocale) {
  this.$set(vuetify.framework.lang.locales, lang, translates);
};

Object.defineProperty(Vue.prototype, '$currentLang', {
  get(): string {
    return vuetify.framework.lang.current;
  },
  set(lang: any): void {
    this.$set(vuetify.framework.lang, 'current', lang);
  }
});

Vue.prototype.$setLocale = function(lang: string): void {
  this.$router.push({
    name: this.$route.name,
    params: {
      ...this.$route.params,
      lang
    }
  });
};

export default vuetify;
