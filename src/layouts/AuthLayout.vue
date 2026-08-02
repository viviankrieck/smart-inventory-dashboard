<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="auth-page flex flex-center">
        <div class="auth-overlay" />
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.auth-page {
  position: relative;
  background: #0a1120 url('/images/login-background.png') center / cover no-repeat;
}

.auth-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(10, 17, 32, 0.85) 0%, rgba(10, 17, 32, 0.55) 55%, rgba(10, 17, 32, 0.35) 100%);
}
</style>
