<template>
  <div class="q-pa-sm">
    <q-table
      flat
      title="Produtos com Estoque Baixo"
      row-key="id"
      :rows="low_stock_products"
      :columns="columns"
      card-class="bg-dark-surface text-neutral max-w-[calc(100vw-2rem)] w-full overflow-x-auto"
      :rows-per-page-options="[5, 10, 15]"
    >
      <template v-slot:body="props">
        <q-tr :props="props" class="hover:bg-neutral/5 transition-colors">
          <!-- ID -->
          <q-td key="id" :props="props" class="text-soft font-mono"> #{{ props.row.id }} </q-td>

          <!-- Produto e Badge de Status -->
          <q-td key="name" :props="props">
            <div class="font-medium">
              {{ props.row.name }}
            </div>
            <q-badge outline :color="get_status(props.row).color" class="q-mt-xs q-px-sm">
              <q-icon :name="get_status(props.row).icon" size="14px" class="q-mr-xs" />
              {{ get_status(props.row).label }}
            </q-badge>
          </q-td>

          <!-- Quantidade Atual -->
          <q-td key="quantity" :props="props" class="text-center">
            <span
              class="font-medium"
              :class="is_low_stock(props.row) ? 'text-negative' : 'text-soft'"
            >
              {{ props.row.quantity }}
            </span>
          </q-td>

          <!-- Quantidade Mínima -->
          <q-td key="minimum_quantity" :props="props" class="text-center text-soft font-medium">
            {{ props.row.minimum_quantity }}
          </q-td>

          <!-- SKU -->
          <q-td key="sku" :props="props" class="text-center">
            <code class="bg-neutral-300 dark:bg-neutral-700/60 q-px-xs q-py-none rounded text-soft">
              {{ props.row.sku }}
            </code>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import type { LowStockProduct } from 'src/interfaces/dashboard';
import { column } from 'src/utils/table';

const { low_stock_products } = defineProps<{
  low_stock_products: Array<LowStockProduct>;
}>();

// Colunas corrigidas (sem duplicação de 'quantity')
const columns = [
  column('id', { label: 'ID', align: 'left' }),
  column('name', { label: 'Produto', align: 'left' }),
  column('quantity', { label: 'Qtd. Atual', align: 'center' }),
  column('minimum_quantity', { label: 'Qtd. Mínima', align: 'center' }),
  column('sku', { label: 'SKU', align: 'center' }),
];

// Lógica corrigida: Alerta ativado quando Estoque Atual <= Mínimo
const is_low_stock = (row: LowStockProduct) => {
  return row.quantity <= row.minimum_quantity;
};

// Retorna dados do Status
const get_status = (row: LowStockProduct) => {
  if (is_low_stock(row)) {
    return {
      color: 'negative', // Vermelho no Quasar
      icon: 'warning',
      label: 'Estoque Baixo',
    };
  }
  return {
    color: 'positive', // Verde no Quasar
    icon: 'check_circle',
    label: 'Estoque Ok',
  };
};
</script>
