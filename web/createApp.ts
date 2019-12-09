import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import { createRouter } from './router';
import vuetify from './plugins/vuetify';
import plugins from './plugins';
import { createStore } from '@web/store';

Vue.use(plugins);


export function createApp(initial: any) {
  const router = createRouter();
  const store = createStore();

  if (initial.store) {
    store.replaceState(initial.store);
  }


  console.error(initial.app);

  const app = new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
  });

  app.$addLocale(initial.app.i18n.currentLang, initial.app.i18n.locale);
  app.$currentLang = initial.app.i18n.currentLang;

  return { app, router, store };
}
