/**
 * @author Dmytro Zataidukh
 * @created_at 11/24/19
 */
import { RouteConfig } from 'vue-router';

export const publicRoutes: RouteConfig[] = [
  {
    path: '/archive',
    name: 'archive',
    component: () => import('@web/pages/Archive.vue')},

  {
    path: '/item/:message',
    name: 'sample',
    component: () => import('@web/components/DynamicItem.vue'),
  },

  {
    path: '*',
    name: '404',
    component: () => import('@web/pages/NotFound.vue'),
  },
];
