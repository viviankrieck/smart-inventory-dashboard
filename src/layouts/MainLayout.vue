<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <MainHeader @toggle-left-drawer="toggleLeftDrawer" />
    </q-header>

    <DrawerMain v-model="left_drawer_open" />

    <q-page-container class="bg-linear-to-r from-primary-300 to-primary-200">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainHeader from 'src/layouts/components/MainHeader.vue';
import DrawerMain from 'src/layouts/components/DrawerMain.vue';

const left_drawer_open = ref(false);

function toggleLeftDrawer() {
  left_drawer_open.value = !left_drawer_open.value;
}
</script>
