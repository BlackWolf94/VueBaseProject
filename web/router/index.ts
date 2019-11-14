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
        component: () => import('@web/pages/Archive.vue'),
    },
    {
        path: '*',
        name: '404',
        component: () => import('@web/pages/NotFound.vue'),
    },
];

export const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

