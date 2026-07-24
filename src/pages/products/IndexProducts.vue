<template>
  <q-page padding>
    <q-card>
      <div class="q-pa-md">
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h6">Produtos</div>
          <!-- Botão Agrupado de Alternância -->
          <q-btn-group
            flat
            class="bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 shadow-xs backdrop-blur-xs"
          >
            <!-- Botão Lista -->
            <q-btn
              flat
              no-caps
              dense
              :ripple="false"
              class="px-3 py-1 rounded-lg transition-all duration-200 text-xs font-medium"
              :class="
                view_mode === 'grid'
                  ? 'bg-soft dark:bg-slate-700 text-main  shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              "
              icon="grid_view"
              label="Grid"
              @click="view_mode = 'grid'"
            />

            <!-- Divisor vertical suave no meio -->
            <div
              class="w-px my-1 bg-slate-200 dark:bg-slate-700 transition-opacity"
              :class="{
                'opacity-0': true /* Opcional: oculta quando um item adjacente está selecionado */,
              }"
            />

            <!-- Botão Grid -->
            <q-btn
              flat
              no-caps
              dense
              :ripple="false"
              class="px-3 py-1 rounded-lg transition-all duration-200 text-xs font-medium"
              :class="
                view_mode === 'list'
                  ? 'bg-soft dark:bg-slate-700 text-main  shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              "
              icon="format_list_bulleted"
              label="Lista"
              @click="view_mode = 'list'"
            />
          </q-btn-group>
        </div>

        <template v-if="view_mode === 'grid'">
          <GridProducts :products="products" />
        </template>

        <template v-if="view_mode === 'list'">
          <ListProducts :products="products" />
        </template>
      </div>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
/* VUE */
import { onMounted, ref } from 'vue';
/* COMPONENTS */
import ListProducts from 'src/components/products/ListProducts.vue';
/* INTERFACES */
import type { ProductI } from 'src/interfaces/product';
/* SERVICES */
import useProductService from 'src/services/product-service';
import GridProducts from 'src/components/products/GridProducts.vue';

const { list } = useProductService();

const products = ref<ProductI[]>([]);
const view_mode = ref<'list' | 'grid'>('grid');

onMounted(() => {
  getProducts();
});

function getProducts() {
  list()
    .then((response) => {
      products.value = response.data.products; // Adjust based on the actual response structure
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>
