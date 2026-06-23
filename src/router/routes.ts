import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    children: [{ path: '/login', component: () => import('../pages/auth/LoginPage.vue') }],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    name: 'dashboard',
    redirect: '/dashboard',
    children: [{ path: '', component: () => import('pages/dashboard/DashboardPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
