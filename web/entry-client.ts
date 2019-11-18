import 'es6-promise/auto';
import {createApp} from '@web/createApp';


const {app, router, store} = createApp();

if ((window as any).__INITIAL_STATE__) {
    store.replaceState((window as any).__INITIAL_STATE__);
}

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
