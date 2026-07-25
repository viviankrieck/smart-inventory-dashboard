<template>
  <q-drawer v-model="left_drawer_open" show-if-above bordered class="bg-linear">
    <q-list>
      <q-item-label header>
        <div class="flex flex-col items-center mb-6">
          <img src="favicon.png" alt="Smart Inventory Logo" style="width: 60px; height: auto" />
          <LogoSmart />
        </div>
      </q-item-label>

      <EssentialLink v-for="link in links_list" :key="link.title" v-bind="link" />
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import LogoSmart from 'src/components/common/LogoSmart.vue';
import { useDependencies } from 'src/composables/dependencies';

const { router } = useDependencies();

const links_list: EssentialLinkProps[] = [
  {
    title: 'Inicio',
    icon: 'home',
    caption: 'Página inicial do sistema',
    link: router.resolve({ name: 'dashboard' }).href,
  },
  {
    title: 'Produtos',
    caption: 'Gerencie seus produtos',
    icon: 'inventory_2',
    link: router.resolve({ name: 'products' }).href,
  },
];

const left_drawer_open = defineModel({
  type: Boolean,
  default: false,
});
</script>
