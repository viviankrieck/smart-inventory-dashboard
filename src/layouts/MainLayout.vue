<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="page-container full-width">
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="lt-md"
          aria-label="Menu"
          @click="toggleDrawer"
        />

        <q-icon name="inventory_2" size="28px" class="q-mr-sm" />
        <q-toolbar-title>
          Smart Inventory
          <span class="text-caption text-weight-regular q-ml-xs">Dashboard</span>
        </q-toolbar-title>

        <q-btn
          flat
          round
          dense
          class="q-mr-xs"
          :icon="settingsStore.darkMode ? 'light_mode' : 'dark_mode'"
          @click="settingsStore.toggleDarkMode()"
        >
          <q-tooltip>{{ settingsStore.darkMode ? 'Tema claro' : 'Tema escuro' }}</q-tooltip>
        </q-btn>

        <q-btn flat round dense icon="notifications" class="q-mr-sm" :to="{ name: 'low-stock' }">
          <q-badge v-if="lowStockCount > 0" color="warning" text-color="dark" floating>
            {{ lowStockCount }}
          </q-badge>
          <q-tooltip>{{ lowStockCount }} produto(s) precisam de atenção</q-tooltip>
        </q-btn>

        <q-btn-dropdown flat no-caps>
          <template #label>
            <q-avatar size="28px" class="q-mr-sm">
              <img v-if="user?.image" :src="user.image" :alt="fullName" />
              <q-icon v-else name="person" />
            </q-avatar>
            <span class="gt-xs">{{ fullName }}</span>
          </template>

          <q-list>
            <q-item clickable v-close-popup :to="{ name: 'profile' }">
              <q-item-section avatar><q-icon name="person" /></q-item-section>
              <q-item-section>Meu perfil</q-item-section>
            </q-item>
            <q-item clickable v-close-popup :to="{ name: 'settings' }">
              <q-item-section avatar><q-icon name="settings" /></q-item-section>
              <q-item-section>Configurações</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section avatar><q-icon name="logout" /></q-item-section>
              <q-item-section>Sair</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" show-if-above bordered :width="240">
      <q-list padding>
        <q-item
          v-for="link in navLinks"
          :key="link.to"
          clickable
          :to="{ name: link.to }"
          active-class="text-primary bg-blue-1"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>{{ link.label }}</q-item-section>
          <q-item-section v-if="link.to === 'low-stock' && lowStockCount > 0" side>
            <q-badge color="warning" text-color="dark">{{ lowStockCount }}</q-badge>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-sm" />

        <q-item clickable :to="{ name: 'settings' }" active-class="text-primary bg-blue-1">
          <q-item-section avatar><q-icon name="settings" /></q-item-section>
          <q-item-section>Configurações</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from 'src/composables/useAuth';
import { useInventoryStore } from 'src/stores/inventory';
import { useSettingsStore } from 'src/stores/settings';

const router = useRouter();
const { user, fullName, logout } = useAuth();
const inventoryStore = useInventoryStore();
const settingsStore = useSettingsStore();

const drawerOpen = ref(false);
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

const lowStockCount = computed(() => inventoryStore.criticalItems.length);

const navLinks = [
  { to: 'dashboard', label: 'Dashboard', icon: 'space_dashboard' },
  { to: 'products', label: 'Produtos', icon: 'inventory_2' },
  { to: 'low-stock', label: 'Estoque baixo', icon: 'report_problem' },
];

const handleLogout = async () => {
  logout();
  await router.push({ name: 'login' });
};

onMounted(() => {
  void inventoryStore.fetchAll();
});
</script>
