import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{ path: '', name: 'login', component: () => import('pages/LoginPage.vue') }],
    meta: { requiresAuth: false },
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: { name: 'dashboard' } },
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'produtos', name: 'products', component: () => import('pages/ProductsPage.vue') },
      {
        path: 'produtos/:id',
        name: 'product-detail',
        component: () => import('pages/ProductDetailPage.vue'),
        props: true,
      },
      { path: 'estoque-baixo', name: 'low-stock', component: () => import('pages/LowStockPage.vue') },
      { path: 'configuracoes', name: 'settings', component: () => import('pages/SettingsPage.vue') },
      { path: 'perfil', name: 'profile', component: () => import('pages/ProfilePage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
