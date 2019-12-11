import 'es6-promise/auto';
import { createApp } from '@web/createApp';

const state = (window as any).__INITIAL_STATE__ || {};
const appConf = (window as any).__INITIAL_APP_CONF__ || {};

async function  bootstrap() {
  const { app, router } = await createApp(appConf, state);

  (window as any).runtime_process_env = {
    DEBUG: true
  };


  const onReady = () => {
    Array.from(document.getElementsByTagName('script'))
      .forEach((el) =>
        el.innerHTML = el.innerHTML.match('__INITIAL_') ? '' : el.innerHTML);

    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all

    // actually mount to DOM
    app.$mount('#app');
  };

// wait until router has resolved all async before hooks
// and async components...
  router.onReady(onReady);
}

bootstrap();

