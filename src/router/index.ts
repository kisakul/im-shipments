import { AppSection } from '@typings/shipments.enum';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Processing from '../views/Processing.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: `/${AppSection.PROCESSING}`,
  },
  {
    path: `/${AppSection.PROCESSING}`,
    name: `${AppSection.PROCESSING}`,
    component: Processing,
  },
  {
    path: `/${AppSection.SUSPENDED}`,
    name: `${AppSection.SUSPENDED}`,
    component: () =>
      import(/* webpackChunkName: "suspended" */ '../views/Suspended.vue'),
  },
  {
    path: `/${AppSection.DELIVERED}`,
    name: `${AppSection.DELIVERED}`,
    component: () =>
      import(/* webpackChunkName: "delivered" */ '../views/Delivered.vue'),
  },
  {
    path: `/${AppSection.RETURNED}`,
    name: `${AppSection.RETURNED}`,
    component: () =>
      import(/* webpackChunkName: "returned" */ '../views/Returned.vue'),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
