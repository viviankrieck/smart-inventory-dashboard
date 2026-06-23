<template>
  <q-page padding class="login-background">
    <div>
      <div class="flex justify-start items-center h-[calc(100vh-64px)]">
        <div
          class="bg-primary-200/70 dark:bg-gray-700/70 backdrop-blur-sm p-8 rounded-lg shadow-md w-full max-w-md md:ml-[10vw]"
        >
          <div class="flex flex-col items-center mb-6">
            <img src="favicon.png" alt="Smart Inventory Logo" style="width: 60px; height: auto" />
            <LogoSmart />

            <div class="absolute top-2 right-2">
              <ThemeSwitcher />
            </div>

            <div class="text-center text-soft mt-4">
              Gerencie seu estoque de forma inteligente e eficiente com o Smart Inventory Dashboard.
              Faça login para acessar suas informações e otimizar sua gestão de inventário.
            </div>
          </div>
          <q-form>
            <q-input dense filled v-model="email" label="Email" type="email" class="mb-4" icon>
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
            <q-input
              dense
              filled
              v-model="password"
              label="Senha"
              type="password"
              class="mb-6"
              icon
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <div class="flex items-center justify-between mb-6">
              <q-checkbox v-model="remember_me" label="Lembrar de mim" />

              <a href="#" class="text-sm text-main hover:underline">Esqueci minha senha</a>
            </div>

            <q-btn
              dense
              label="Login"
              type="submit"
              text-color="white"
              class="w-full !bg-main"
              :loading="is_loading"
              @click="handleLogin"
            />
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LogoSmart from 'src/components/common/LogoSmart.vue';
import { useAuth } from 'src/composables/auth';
import { useDependencies } from 'src/composables/dependencies';
import ThemeSwitcher from 'src/components/common/ThemeSwitcher.vue';

const { router } = useDependencies();
const { email, password, remember_me, login } = useAuth();

const is_loading = ref(false);

async function handleLogin() {
  is_loading.value = true;
  try {
    await login();
    void router.push({ name: 'dashboard' });
  } finally {
    is_loading.value = false;
  }
}
</script>
