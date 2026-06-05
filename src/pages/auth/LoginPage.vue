<template>
  <q-page padding class="login-background">
    <div>
      <div class="flex justify-start items-center h-screen">
        <div
          class="bg-primary-100 bg-opacity-50 p-8 rounded-lg shadow-md w-full max-w-md ml-[10vw]"
        >
          <div class="flex flex-col items-center mb-6">
            <img src="favicon.png" alt="Smart Inventory Logo" style="width: 60px; height: auto" />
            <LogoSmart />

            <div class="text-center text-gray-700 mt-4">
              Gerencie seu estoque de forma inteligente e eficiente com o Smart Inventory Dashboard.
              Faça login para acessar suas informações e otimizar sua gestão de inventário.
            </div>
          </div>
          <q-form>
            <q-input filled v-model="email" label="Email" type="email" class="mb-4" icon>
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
            <q-input filled v-model="password" label="Senha" type="password" class="mb-6" icon>
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <div class="flex items-center justify-between mb-6">
              <q-checkbox v-model="remember_me" label="Lembrar de mim" />

              <a href="#" class="text-sm text-primary-800 hover:underline">Esqueci minha senha</a>
            </div>

            <q-btn
              color="primary"
              label="Login"
              type="submit"
              class="w-full"
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

const { router } = useDependencies();
const { email, password, remember_me, login } = useAuth();

const is_loading = ref(false);

async function handleLogin() {
  is_loading.value = true;
  try {
    await login();
    // Redirecionar para a página principal ou dashboard após o login bem-sucedido
    router.push('/dashboard');
  } finally {
    is_loading.value = false;
  }
}
</script>
