import {createApp} from '@web/createApp';
import {VueRouter} from 'vue-router/types/router';
import { TSSRContext } from '@common/types/TSSR';

const routerOnReady = (router: VueRouter) => new Promise((resolve, reject) => {
    router.onReady(resolve, reject);
});


// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default (context: TSSRContext) => new Promise(async (resolve, reject) => {
    const {app, router, store} = createApp();

    // app.$addLocale(context.currentLang, context.locale);
    // app.$currentLang = context.currentLang;
    const {url} = context;
    const {fullPath} = router.resolve(url).route;
    if (fullPath !== url) {
        return reject({url: fullPath});
    }

    // set router's location
    router.push(url);

    try {
        await routerOnReady(router);
        const matchedComponents = router.getMatchedComponents();
        if (!matchedComponents.length) {
            return reject({code: 404});
        }

        context.state = store.state;
        resolve(app);

    } catch (e) {
        console.error(e);
        reject(e);
    }

});

