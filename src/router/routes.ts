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
    // Removido o redirect: '/dashboard'
    children: [
      { path: '', name: 'dashboard', component: () => import('pages/dashboard/DashboardPage.vue') },
    ],
  },
  {
    path: '/products',
    component: () => import('layouts/MainLayout.vue'), // Adicione o layout se necessário
    // Removido o redirect: '/products'
    children: [
      {
        path: '',
        name: 'products',
        component: () => import('../pages/products/IndexProducts.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
