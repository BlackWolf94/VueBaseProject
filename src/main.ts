import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import {createRouter} from './router';
import vuetify from './plugins/vuetify';
import plugins from './plugins';
import {createStore} from '@/store';

Vue.use(plugins);

Vue.config.productionTip = false;

new Vue({
  router: createRouter(),
  store: createStore(),
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
