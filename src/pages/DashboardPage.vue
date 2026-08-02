<template>
  <q-page class="page-container q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Olá, {{ firstName }} 👋</div>
        <div class="text-caption text-grey-7">Visão geral do seu inventário</div>
      </div>
      <q-btn
        outline
        color="primary"
        icon="refresh"
        label="Atualizar"
        :loading="inventoryStore.isLoading"
        @click="inventoryStore.fetchAll(true)"
      />
    </div>

    <div v-if="inventoryStore.error" class="q-mb-md">
      <q-banner class="bg-red-1 text-negative rounded-borders">{{ inventoryStore.error }}</q-banner>
    </div>

    <q-banner v-if="hasCriticalStock" class="bg-orange-1 text-orange-9 rounded-borders q-mb-md" rounded>
      <template #avatar><q-icon name="report_problem" color="warning" /></template>
      {{ inventoryStore.criticalItems.length }} produto(s) precisam de atenção no estoque.
      <template #action>
        <q-btn flat color="orange-9" label="Ver estoque baixo" :to="{ name: 'low-stock' }" />
      </template>
    </q-banner>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-6 col-md-3">
        <StatCard title="Total de produtos" :value="formatNumber(inventoryStore.totalProducts)" icon="inventory_2" color="primary" />
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <StatCard title="Unidades em estoque" :value="formatNumber(inventoryStore.totalStock)" icon="warehouse" color="secondary" />
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <StatCard
          title="Estoque baixo"
          :value="formatNumber(inventoryStore.lowStockItems.length)"
          icon="report_problem"
          color="warning"
          :subtitle="`≤ ${settingsStore.lowStockThreshold} un. · ${inventoryStore.outOfStockItems.length} esgotado(s)`"
        />
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <StatCard title="Valor total (estoque)" :value="formatCurrency(inventoryStore.totalValue)" icon="payments" color="positive" />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-7">
        <CategoryStockChart
          :labels="inventoryStore.stockByCategory.slice(0, 6).map((c) => c.category)"
          :series="inventoryStore.stockByCategory.slice(0, 6).map((c) => c.stock)"
        />
      </div>
      <div class="col-12 col-md-5">
        <LowStockList :products="inventoryStore.criticalItems.slice(0, 6)" />
        <div class="text-center q-mt-sm">
          <q-btn flat dense color="primary" label="Ver lista completa" :to="{ name: 'low-stock' }" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuth } from 'src/composables/useAuth';
import { useFormat } from 'src/composables/useFormat';
import { useInventoryStore } from 'src/stores/inventory';
import { useSettingsStore } from 'src/stores/settings';
import StatCard from 'src/components/dashboard/StatCard.vue';
import CategoryStockChart from 'src/components/dashboard/CategoryStockChart.vue';
import LowStockList from 'src/components/dashboard/LowStockList.vue';

const { user } = useAuth();
const { formatCurrency, formatNumber } = useFormat();
const inventoryStore = useInventoryStore();
const settingsStore = useSettingsStore();

const firstName = computed(() => user.value?.firstName ?? '');
const hasCriticalStock = computed(() => inventoryStore.criticalItems.length > 0);

onMounted(() => {
  void inventoryStore.fetchAll();
});
</script>
