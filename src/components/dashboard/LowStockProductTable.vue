<template>
  <div class="q-pa-sm">
    <q-table
      flat
      title="Produtos com Estoque Baixo"
      row-key="id"
      :rows="low_stock_products"
      :columns="columns"
      :rows-per-page-options="[5, 10, 15]"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            <div :class="{ 'text-red-4': minimum_quantity_exceeded(props.row) }">
              {{ props.row.id }}
              <q-icon
                v-if="minimum_quantity_exceeded(props.row)"
                :name="minimum_quantity_color(props.row).icon"
                :color="minimum_quantity_color(props.row).color"
                size="xs"
                class="q-ml-xs"
              >
                <q-tooltip class="text-sm">
                  {{ minimum_quantity_color(props.row).tooltip }}
                </q-tooltip>
              </q-icon>
            </div>
          </q-td>
          <q-td key="name" :props="props">
            <div :class="{ 'text-red-4': minimum_quantity_exceeded(props.row) }">
              {{ props.row.name }}
            </div>
          </q-td>
          <q-td key="quantity" :props="props">
            <q-badge
              :color="minimum_quantity_color(props.row).color"
              :icon="minimum_quantity_color(props.row).icon"
              :title="minimum_quantity_color(props.row).tooltip"
            >
              {{ props.row.quantity }}
            </q-badge>
          </q-td>
          <q-td key="minimum_quantity" :props="props">
            <q-badge :color="quantity_color(props.row)">
              {{ props.row.minimum_quantity }}
            </q-badge>
          </q-td>
          <q-td key="sku" :props="props">
            <q-badge :color="sku_color(props.row)">
              {{ props.row.sku }}
            </q-badge>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script setup lang="ts">
import { LowStockProduct } from 'src/interfaces/dashboard';

const { low_stock_products = [] } = defineProps<{
  low_stock_products: Array<LowStockProduct>;
}>();

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left' as const,
    field: 'id',
  },
  {
    name: 'name',
    required: true,
    label: 'Produto',
    align: 'left' as const,
    field: 'name',
  },
  {
    name: 'quantity',
    required: true,
    label: 'Quantidade',
    align: 'center' as const,
    field: 'quantity',
  },
  {
    name: 'minimum_quantity',
    required: true,
    label: 'Quantidade Mínima',
    align: 'center' as const,
    field: 'minimum_quantity',
  },
  {
    name: 'sku',
    required: true,
    label: 'SKU',
    align: 'center' as const,
    field: 'sku',
  },
];

const minimum_quantity_exceeded = (row: LowStockProduct) => {
  return row.quantity >= row.minimum_quantity;
};

const minimum_quantity_color = (row: LowStockProduct) => {
  if (minimum_quantity_exceeded(row)) {
    return {
      color: 'red-4',
      icon: 'warning',
      tooltip: 'Produto com estoque baixo',
    };
  } else {
    return {
      color: 'purple-3',
      icon: 'check_circle',
      tooltip: 'Produto com estoque suficiente',
    };
  }
};

const quantity_color = (row: LowStockProduct) => {
  return minimum_quantity_exceeded(row) ? 'red-4' : 'purple-3';
};

const sku_color = (row: LowStockProduct) => {
  return minimum_quantity_exceeded(row) ? 'red-4' : 'primary';
};
</script>
