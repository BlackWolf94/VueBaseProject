import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import {createRouter} from './router';
import vuetify from './plugins/vuetify';
import plugins from './plugins';
import {createStore} from '@/store';
Vue.use(plugins);


export function createApp() {
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
            router,
            store,
            vuetify,
            render: h => h(App),
        });

    return {app, router, store};
}
