<template>
  <q-table
    flat
    bordered
    :rows="products"
    :columns="columns"
    row-key="id"
    :loading="loading"
    :pagination="pagination"
    hide-pagination
    @row-click="(_, row) => $emit('select', row as Product)"
  >
    <template #body-cell-product="cellProps">
      <q-td :props="cellProps">
        <div class="row items-center no-wrap q-gutter-sm">
          <q-avatar rounded size="36px">
            <img :src="cellProps.row.thumbnail" :alt="cellProps.row.title" />
          </q-avatar>
          <div>
            <div class="text-weight-medium">{{ cellProps.row.title }}</div>
            <div class="text-caption text-grey-7">{{ cellProps.row.brand || cellProps.row.sku }}</div>
          </div>
        </div>
      </q-td>
    </template>

    <template #body-cell-stock="cellProps">
      <q-td :props="cellProps">
        <q-badge :color="stockLevelColor[getStockLevel(cellProps.row.stock)]">
          {{ cellProps.row.stock }} un.
        </q-badge>
      </q-td>
    </template>

    <template #body-cell-price="cellProps">
      <q-td :props="cellProps">{{ formatCurrency(cellProps.row.price) }}</q-td>
    </template>

    <template #body-cell-rating="cellProps">
      <q-td :props="cellProps">
        <q-rating :model-value="Math.round(cellProps.row.rating)" readonly size="16px" color="warning" />
      </q-td>
    </template>

    <template #no-data>
      <div class="full-width text-center text-grey-6 q-pa-lg">Nenhum produto encontrado.</div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import type { Product } from 'src/interfaces/product';
import { useFormat } from 'src/composables/useFormat';
import { useStockLevel } from 'src/composables/useStockLevel';

defineProps<{ products: Product[]; loading?: boolean }>();
defineEmits<{ select: [product: Product] }>();

const { formatCurrency } = useFormat();
const { getStockLevel, stockLevelColor } = useStockLevel();

const pagination = { rowsPerPage: 0 };

const columns: QTableColumn<Product>[] = [
  { name: 'product', label: 'Produto', field: 'title', align: 'left' },
  { name: 'category', label: 'Categoria', field: 'category', align: 'left', sortable: true },
  { name: 'price', label: 'Preço', field: 'price', align: 'right', sortable: true },
  { name: 'stock', label: 'Estoque', field: 'stock', align: 'center', sortable: true },
  { name: 'rating', label: 'Avaliação', field: 'rating', align: 'center' },
];
</script>
