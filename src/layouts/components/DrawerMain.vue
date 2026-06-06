<template>
  <q-drawer
    v-model="left_drawer_open"
    show-if-above
    bordered
    class="bg-linear-to-t from-primary-800 to-primary-400"
  >
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

const links_list: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

const left_drawer_open = defineModel({
  type: Boolean,
  default: false,
});
</script>
