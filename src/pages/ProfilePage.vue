<template>
  <q-page class="page-container q-pa-md">
    <div class="q-mb-md">
      <div class="text-h5 text-weight-bold">Meu perfil</div>
      <div class="text-caption text-grey-7">Dados da sua conta</div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4">
        <q-card flat bordered class="text-center q-pa-lg">
          <q-avatar size="96px">
            <img v-if="user?.image" :src="user.image" :alt="fullName" />
            <q-icon v-else name="person" size="64px" />
          </q-avatar>
          <div class="text-h6 text-weight-bold q-mt-md">{{ fullName }}</div>
          <div class="text-caption text-grey-7">@{{ user?.username }}</div>
        </q-card>
      </div>

      <div class="col-12 col-md-8">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Informações pessoais</div>
            <div class="text-caption text-grey-7">
              Ambiente de demonstração: as alterações não são enviadas ao servidor
            </div>
          </q-card-section>
          <q-separator />

          <q-card-section>
            <q-form class="q-pa-md q-gutter-md" @submit.prevent="handleSave">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-input v-model="form.firstName" label="Nome" outlined dense />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input v-model="form.lastName" label="Sobrenome" outlined dense />
                </div>
                <div class="col-12">
                  <q-input v-model="form.email" label="E-mail" type="email" outlined dense />
                </div>
              </div>

              <div>
                <q-btn type="submit" color="primary" unelevated label="Salvar alterações" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useQuasar } from 'quasar';
import { useAuth } from 'src/composables/useAuth';

const $q = useQuasar();
const { user, fullName } = useAuth();

const form = reactive({
  firstName: user.value?.firstName ?? '',
  lastName: user.value?.lastName ?? '',
  email: user.value?.email ?? '',
});

const handleSave = () => {
  $q.notify({ type: 'positive', message: 'Perfil atualizado.' });
};
</script>
