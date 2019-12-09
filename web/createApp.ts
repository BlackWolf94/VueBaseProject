import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import { createRouter } from './router';
import vuetify from './plugins/vuetify';
import plugins from './plugins';
import { createStore } from '@web/store';
import { TSSRContext } from '@common/types/TSSR';

Vue.use(plugins);

export function createApp({ state, meta }: TSSRContext) {
  const router = createRouter(state.app.baseUrl);
  const store = createStore();

  console.error(state.app);

  const app = new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
  });

  if (state.initialState) {
    store.replaceState(state.initialState);
  }

  app.$addLocale(state.app.currentLang, state.app.locale);
  app.$currentLang = state.app.currentLang;

  return { app, router, store };
}
