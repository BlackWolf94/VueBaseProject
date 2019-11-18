import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '@web/components/HelloWorld.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HelloWorld,
    },
    {
        path: '/archive',
        name: 'archive',
        component: (resolve: any) => require(['@web/pages/Archive.vue'], (m) => resolve(m.default)),
    },

    {
        path: '/item/:message',
        name: 'sample',
        component: () => import('@web/components/DynamicItem.vue'),
    },

    {
        path: '*',
        name: '404',
        component: (resolve: any) => require(['@web/pages/NotFound.vue'], (m) => resolve(m.default)),
    },
];

export const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

