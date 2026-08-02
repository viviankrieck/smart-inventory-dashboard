<template>
  <q-card flat bordered class="q-pa-sm list-card">
    <q-card-section class="q-pb-none">
      <div class="text-subtitle1 text-weight-medium">Atenção ao estoque</div>
      <div class="text-caption text-grey-7">Produtos esgotados ou próximos do limite mínimo</div>
    </q-card-section>

    <q-list separator>
      <q-item v-for="product in products" :key="product.id" clickable :to="{ name: 'product-detail', params: { id: product.id } }">
        <q-item-section avatar>
          <q-avatar rounded size="40px">
            <img :src="product.thumbnail" :alt="product.title" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-ellipsis">{{ product.title }}</q-item-label>
          <q-item-label caption>{{ product.category }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="stockLevelColor[getStockLevel(product.stock)]">
            {{ product.stock }} un.
          </q-badge>
        </q-item-section>
      </q-item>

      <q-item v-if="products.length === 0">
        <q-item-section class="text-grey-6 text-center q-py-md">
          Nenhum produto com estoque baixo nesta página. 🎉
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import type { Product } from 'src/interfaces/product';
import { useStockLevel } from 'src/composables/useStockLevel';

defineProps<{ products: Product[] }>();

const { getStockLevel, stockLevelColor } = useStockLevel();
</script>

<style scoped>
.list-card {
  border-radius: 12px;
  height: 100%;
}
</style>
