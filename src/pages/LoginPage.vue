<template>
  <q-card class="login-card q-pa-md">
    <q-card-section class="text-center q-pb-none">
      <q-icon name="inventory_2" size="42px" color="primary" />
      <div class="text-h5 text-weight-bold q-mt-sm">Smart Inventory</div>
      <div class="text-caption text-grey-7">Acesse o painel de gestão de estoque</div>
    </q-card-section>

    <q-card-section>
      <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
        <q-input
          v-model="form.username"
          label="Usuário"
          outlined
          dense
          autofocus
          :rules="[(val) => !!val || 'Informe o usuário']"
        />

        <q-input
          v-model="form.password"
          label="Senha"
          outlined
          dense
          :type="showPassword ? 'text' : 'password'"
          :rules="[(val) => !!val || 'Informe a senha']"
        >
          <template #append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <q-banner v-if="error" class="bg-red-1 text-negative rounded-borders" dense>
          {{ error }}
        </q-banner>

        <q-btn
          type="submit"
          color="primary"
          label="Entrar"
          class="full-width"
          unelevated
          :loading="isLoading"
        />
      </q-form>
    </q-card-section>

    <q-card-section class="text-caption text-grey-7 text-center q-pt-none">
      Ambiente de demonstração (API DummyJSON). Use um usuário de teste, por exemplo
      <b>emilys</b> / <b>emilyspass</b>.
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from 'src/composables/useAuth';

const router = useRouter();
const route = useRoute();
const { login, isLoading, error } = useAuth();

const form = reactive({ username: '', password: '' });
const showPassword = ref(false);

const handleSubmit = async () => {
  try {
    await login({ ...form });
    const redirect = (route.query.redirect as string) || { name: 'dashboard' };
    await router.push(redirect);
  } catch {
    // erro já tratado/exposto pela store de auth
  }
};
</script>

<style scoped>
.login-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 380px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(6px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}
</style>
