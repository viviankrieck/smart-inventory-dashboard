<template>
  <div>
    <q-table
      dense
      flat
      :rows="products"
      :columns="columns"
      row-key="id"
      class="h-[calc(100vh-80px)]"
      virtual-scroll
      :rows-per-page-options="[50, 100]"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-soft text-[0.65rem]! font-bold!"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <!-- BODY -->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="xs"
              flat
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'expand_more' : 'chevron_right'"
            />
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="title" :props="props">
            <div class="flex items-center gap-x-3 flex-nowrap">
              <q-avatar size="35px" rounded>
                <img :src="props.row.thumbnail" alt="Product" />
              </q-avatar>
              <div class="max-w-fit text-wrap font-medium">
                {{ props.row.title }}
              </div>
            </div>
          </q-td>
          <q-td key="sku" :props="props">
            {{ props.row.sku }}
          </q-td>
          <q-td key="category" :props="props">
            {{ props.row.category }}
          </q-td>
          <q-td key="minimum_order_quantity" :props="props">
            {{ props.row.minimumOrderQuantity }}
          </q-td>
          <q-td key="dimensions" :props="props">
            {{
              `${props.row.dimensions.depth} x ${props.row.dimensions.width} x ${props.row.dimensions.height}`
            }}
          </q-td>
          <q-td key="stock" :props="props">
            {{ props.row.stock }}
          </q-td>
          <q-td key="price" :props="props">
            {{ '$ ' + props.row.price }}
          </q-td>
          <q-td key="rating" :props="props">
            <ProductRating :product="props.row" />
          </q-td>
        </q-tr>

        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div
              class="bg-neutral-100/60 p-2 text-neutral-800 rounded-lg dark:(bg-neutral-700/40 text-neutral-300) max-w-fit text-wrap"
            >
              <span> {{ 'Descrição' }}: </span>
              <span class="text-soft font-italic"> {{ props.row.description }}. </span>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script setup lang="ts">
/* VUE */
/* UTILS */
import { column } from 'src/utils/table';
/* INTERFACES */
import type { ProductI } from 'src/interfaces/product';
/* COMPONENTS */
import ProductRating from 'src/components/products/ProductRating.vue';

/* PROPS */
const { products } = defineProps<{
  products: ProductI[];
}>();

/* TABLE COLUMNS */
const columns = [
  column('expand', { label: 'Expandir' }),
  column('id', { label: 'ID', sortable: true }),
  column('title', { label: 'Título', sortable: true }),
  column('sku', { label: 'SKU', sortable: true }),
  column('category', { label: 'Categoria', sortable: true }),
  column('minimum_order_quantity', { label: 'Quantidade Mínima', sortable: true }),
  column('dimensions', { label: 'Dimensões', sortable: true }),
  column('stock', { label: 'Estoque', sortable: true }),
  column('price', { label: 'Preço', sortable: true }),
  column('rating', { label: 'Avaliação', align: 'center', sortable: true }),
];
</script>
