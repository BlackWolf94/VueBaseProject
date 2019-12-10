import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { publicRoutes } from '@web/router/public';
import { beforeEach } from '@web/router/hooks';

Vue.use(VueRouter);

const mapRoute = (route: RouteConfig) => ({
  ...route,
  path: `/:lang${route.path}`
});

export const createRouter = () => {
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    // routes: publicRoutes,
    routes: [
      ...publicRoutes
    ].map(mapRoute),
  });

  router.beforeEach(beforeEach.bind(router));
  return router;
};

