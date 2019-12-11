import Vue from 'vue';
import './registerServiceWorker';
import plugins from './plugins';
import { createApp } from '@web/createApp';

Vue.use(plugins);

Vue.config.productionTip = false;

async function bootstrap() {
  const { app } = await createApp( );

  app.$mount('#app');
}

bootstrap();
