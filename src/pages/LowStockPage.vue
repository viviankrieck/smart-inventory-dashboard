<template>
  <q-page class="page-container q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Estoque baixo</div>
        <div class="text-caption text-grey-7">
          Produtos esgotados ou com estoque igual/abaixo de {{ settingsStore.lowStockThreshold }} unidades
        </div>
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

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-6 col-sm-3">
        <StatCard title="Esgotados" :value="inventoryStore.outOfStockItems.length" icon="remove_shopping_cart" color="negative" />
      </div>
      <div class="col-6 col-sm-3">
        <StatCard title="Estoque baixo" :value="inventoryStore.lowStockItems.length" icon="report_problem" color="warning" />
      </div>
    </div>

    <q-card flat bordered class="q-pa-md q-mb-md">
      <q-input
        v-model="search"
        outlined
        dense
        clearable
        placeholder="Buscar por nome ou categoria..."
      >
        <template #prepend><q-icon name="search" /></template>
      </q-input>
    </q-card>

    <q-banner v-if="inventoryStore.error" class="bg-red-1 text-negative rounded-borders q-mb-md">
      {{ inventoryStore.error }}
    </q-banner>

    <ProductTable :products="filteredProducts" :loading="inventoryStore.isLoading" @select="goToDetail" />
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useInventoryStore } from 'src/stores/inventory';
import { useSettingsStore } from 'src/stores/settings';
import ProductTable from 'src/components/products/ProductTable.vue';
import StatCard from 'src/components/dashboard/StatCard.vue';
import type { Product } from 'src/interfaces/product';

const router = useRouter();
const inventoryStore = useInventoryStore();
const settingsStore = useSettingsStore();

const search = ref('');

const filteredProducts = computed(() => {
  const term = search.value.trim().toLowerCase();
  if (!term) return inventoryStore.criticalItems;

  return inventoryStore.criticalItems.filter(
    (p) => p.title.toLowerCase().includes(term) || p.category.toLowerCase().includes(term),
  );
});

const goToDetail = (product: Product) => {
  void router.push({ name: 'product-detail', params: { id: product.id } });
};

onMounted(() => {
  void inventoryStore.fetchAll();
});
</script>
