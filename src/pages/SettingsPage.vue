<template>
  <q-page class="page-container q-pa-md">
    <div class="q-mb-md">
      <div class="text-h5 text-weight-bold">Configurações</div>
      <div class="text-caption text-grey-7">Personalize a aparência e as regras do sistema</div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Aparência</div>
            <div class="text-caption text-grey-7">Escolha como o sistema deve ser exibido</div>
          </q-card-section>
          <q-separator />
          <q-list>
            <q-item tag="label">
              <q-item-section avatar>
                <q-icon :name="settingsStore.darkMode ? 'dark_mode' : 'light_mode'" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Tema escuro</q-item-label>
                <q-item-label caption>Reduz o brilho da interface, ideal para ambientes com pouca luz</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle
                  :model-value="settingsStore.darkMode"
                  color="primary"
                  @update:model-value="settingsStore.setDarkMode"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Regras de estoque</div>
            <div class="text-caption text-grey-7">Define quando um produto é considerado "estoque baixo"</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-gutter-sm">
            <q-input
              v-model.number="thresholdInput"
              type="number"
              label="Limite de estoque baixo (unidades)"
              outlined
              dense
              min="1"
              :rules="[(val) => val > 0 || 'Informe um valor maior que zero']"
            />
            <div class="row q-gutter-sm">
              <q-btn color="primary" unelevated label="Salvar" @click="saveThreshold" />
              <q-btn flat label="Restaurar padrão (15)" @click="restoreDefault" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Sobre o sistema</div>
          </q-card-section>
          <q-separator />
          <q-list>
            <q-item>
              <q-item-section avatar><q-icon name="apps" /></q-item-section>
              <q-item-section>Smart Inventory Dashboard</q-item-section>
              <q-item-section side class="text-grey-7">v0.1.0</q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar><q-icon name="cloud" /></q-item-section>
              <q-item-section>Fonte de dados</q-item-section>
              <q-item-section side class="text-grey-7">DummyJSON (demonstração)</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useSettingsStore } from 'src/stores/settings';

const $q = useQuasar();
const settingsStore = useSettingsStore();

const thresholdInput = ref(settingsStore.lowStockThreshold);

const saveThreshold = () => {
  settingsStore.setLowStockThreshold(thresholdInput.value);
  $q.notify({ type: 'positive', message: 'Configurações salvas.' });
};

const restoreDefault = () => {
  settingsStore.resetLowStockThreshold();
  thresholdInput.value = settingsStore.lowStockThreshold;
  $q.notify({ type: 'positive', message: 'Limite restaurado para o padrão.' });
};
</script>
