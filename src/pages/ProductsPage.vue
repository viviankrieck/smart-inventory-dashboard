<template>
  <q-page class="page-container q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Produtos</div>
        <div class="text-caption text-grey-7">{{ productsStore.total }} produtos cadastrados</div>
      </div>
      <q-btn color="primary" unelevated icon="add" label="Novo produto" @click="isFormOpen = true" />
    </div>

    <ProductFormDialog v-model="isFormOpen" @created="productsStore.fetchProducts" />

    <q-card flat bordered class="q-pa-md q-mb-md">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input
            v-model="searchInput"
            outlined
            dense
            clearable
            debounce="400"
            placeholder="Buscar por nome, marca..."
            @update:model-value="onSearch"
          >
            <template #prepend><q-icon name="search" /></template>
          </q-input>
        </div>
        <div class="col-12 col-sm-6">
          <q-select
            v-model="categoryInput"
            outlined
            dense
            clearable
            emit-value
            map-options
            :options="categoryOptions"
            placeholder="Filtrar por categoria"
            @update:model-value="onCategoryChange"
          >
            <template #prepend><q-icon name="category" /></template>
          </q-select>
        </div>
      </div>
    </q-card>

    <q-banner v-if="productsStore.error" class="bg-red-1 text-negative rounded-borders q-mb-md">
      {{ productsStore.error }}
    </q-banner>

    <ProductTable
      :products="productsStore.items"
      :loading="productsStore.isLoading"
      @select="goToDetail"
    />

    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="page"
        :max="maxPage"
        :max-pages="6"
        boundary-numbers
        direction-links
        @update:model-value="productsStore.setPage"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductsStore } from 'src/stores/products';
import ProductTable from 'src/components/products/ProductTable.vue';
import ProductFormDialog from 'src/components/products/ProductFormDialog.vue';
import type { Product } from 'src/interfaces/product';

const router = useRouter();
const productsStore = useProductsStore();

const searchInput = ref(productsStore.search);
const categoryInput = ref<string | null>(productsStore.category);
const page = ref(productsStore.page);
const isFormOpen = ref(false);

const maxPage = computed(() => Math.max(1, Math.ceil(productsStore.total / productsStore.rowsPerPage)));

const categoryOptions = computed(() =>
  productsStore.categories.map((c) => ({ label: c.name, value: c.slug })),
);

const onSearch = (value: string | number | null) => {
  productsStore.setSearch(String(value ?? ''));
  page.value = 1;
};

const onCategoryChange = (value: string | null) => {
  productsStore.setCategory(value);
  page.value = 1;
};

const goToDetail = (product: Product) => {
  void router.push({ name: 'product-detail', params: { id: product.id } });
};

onMounted(() => {
  void productsStore.fetchCategories();
  void productsStore.fetchProducts();
});
</script>
