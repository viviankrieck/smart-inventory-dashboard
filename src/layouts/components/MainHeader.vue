<template>
  <q-toolbar class="flex items-center justify-between bg-linear">
    <q-btn flat dense round icon="menu" aria-label="Menu" @click="emit('toggle-left-drawer')" />

    <div>
      <ThemeSwitcher />

      <q-btn
        flat
        dense
        round
        icon="account_box"
        class="bg-primary-100 ml-2"
        :loading="is_logging_out"
      >
        <q-menu>
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section> Profile </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section> Logout </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from 'src/composables/auth';
import { useDependencies } from 'src/composables/dependencies';
import ThemeSwitcher from 'src/components/common/ThemeSwitcher.vue';

/* DEPENDENCIES */
const { logout } = useAuth();
const { router } = useDependencies();

const emit = defineEmits(['toggle-left-drawer']);

const is_logging_out = ref(false);

async function handleLogout() {
  is_logging_out.value = true;
  try {
    await logout();
    void router.push('/login');
  } finally {
    is_logging_out.value = false;
  }
}
</script>
