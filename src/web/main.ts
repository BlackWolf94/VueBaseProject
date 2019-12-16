import Vue from 'vue';
import './registerServiceWorker';
import { createApp } from '@web/createApp';


Vue.config.productionTip = false;

async function bootstrap() {
  const { app } = await createApp( );

  app.$mount('#app');
}

bootstrap();
