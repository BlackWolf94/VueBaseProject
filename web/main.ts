import Vue from 'vue';
import './registerServiceWorker';
import plugins from './plugins';
import { createApp } from '@web/createApp';

Vue.use(plugins);

Vue.config.productionTip = false;
const { app } = createApp({state: {}, title: ''});

app.$mount('#app');
