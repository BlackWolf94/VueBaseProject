import 'es6-promise/auto';
import {createApp} from '@web/createApp';

const state = (window as any).__INITIAL_STATE__ || {};
const appConf = (window as any).__INITIAL_APP_CONF__ || {};


const {app, router} = createApp(appConf, state);

(window as any).runtime_process_env = {
    DEBUG: true,
};

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all

    // actually mount to DOM
    app.$mount('#app');
});
