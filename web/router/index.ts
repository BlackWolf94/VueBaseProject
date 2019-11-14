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
        path: '/404',
        name: '404',
        component: () => import('@web/pages/NotFound.vue'),
    },
    {
        path: '*',
        redirect: '/404',
    },
    // {
    //     path: '/hello',
    //     name: 'hello',
    //     component: () => import('@web/components/HelloWorld2.vue'),
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    // },
];

export const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

