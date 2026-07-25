<template>
  <q-btn
    dense
    flat
    round
    :icon="Dark.isActive ? 'light_mode' : 'dark_mode'"
    @click="toggleDarkMode"
  />
</template>
<script setup lang="ts">
import { Dark } from 'quasar';

function toggleDarkMode() {
  Dark.toggle();
}
</script>
