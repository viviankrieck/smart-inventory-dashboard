<template>
  <q-page class="page-container q-pa-md">
    <q-btn flat dense icon="arrow_back" label="Voltar para produtos" class="q-mb-md" :to="{ name: 'products' }" />

    <q-inner-loading :showing="isLoading" />

    <q-banner v-if="error" class="bg-red-1 text-negative rounded-borders">{{ error }}</q-banner>

    <div v-else-if="product" class="row q-col-gutter-lg">
      <div class="col-12 col-md-5">
        <q-carousel v-model="activeImage" swipeable animated arrows navigation height="320px" class="rounded-borders bg-grey-2">
          <q-carousel-slide
            v-for="(image, index) in product.images.length ? product.images : [product.thumbnail]"
            :key="index"
            :name="index"
            :img-src="image"
          />
        </q-carousel>
      </div>

      <div class="col-12 col-md-7">
        <div class="row items-start justify-between">
          <div>
            <div class="text-caption text-grey-7">{{ product.category }} • {{ product.brand }}</div>
            <div class="text-h5 text-weight-bold">{{ product.title }}</div>
          </div>
          <q-badge :color="stockLevelColor[getStockLevel(product.stock)]" class="q-pa-sm">
            {{ stockLevelLabel[getStockLevel(product.stock)] }}
          </q-badge>
        </div>

        <div class="row items-center q-gutter-sm q-my-sm">
          <q-rating :model-value="Math.round(product.rating)" readonly color="warning" />
          <span class="text-caption text-grey-7">{{ product.rating.toFixed(1) }} de avaliação</span>
        </div>

        <p class="text-body1 text-grey-9">{{ product.description }}</p>

        <div class="row q-col-gutter-md q-my-md">
          <div class="col-6 col-sm-4">
            <div class="text-caption text-grey-7">Preço</div>
            <div class="text-h6 text-weight-bold">{{ formatCurrency(product.price) }}</div>
          </div>
          <div class="col-6 col-sm-4">
            <div class="text-caption text-grey-7">Estoque</div>
            <div class="text-h6 text-weight-bold">{{ product.stock }} un.</div>
          </div>
          <div class="col-6 col-sm-4">
            <div class="text-caption text-grey-7">SKU</div>
            <div class="text-h6 text-weight-bold">{{ product.sku }}</div>
          </div>
        </div>

        <q-list bordered class="rounded-borders">
          <q-item>
            <q-item-section avatar><q-icon name="local_shipping" /></q-item-section>
            <q-item-section>{{ product.shippingInformation }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar><q-icon name="verified_user" /></q-item-section>
            <q-item-section>{{ product.warrantyInformation }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar><q-icon name="assignment_return" /></q-item-section>
            <q-item-section>{{ product.returnPolicy }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { productService } from 'src/services/productService';
import { useFormat } from 'src/composables/useFormat';
import { useStockLevel } from 'src/composables/useStockLevel';
import type { Product } from 'src/interfaces/product';

const props = defineProps<{ id: string | number }>();

const { formatCurrency } = useFormat();
const { getStockLevel, stockLevelColor, stockLevelLabel } = useStockLevel();

const product = ref<Product | null>(null);
const activeImage = ref(0);
const isLoading = ref(false);
const error = ref<string | null>(null);

const loadProduct = async () => {
  isLoading.value = true;
  error.value = null;
  activeImage.value = 0;

  try {
    product.value = await productService.getById(Number(props.id));
  } catch {
    error.value = 'Produto não encontrado.';
  } finally {
    isLoading.value = false;
  }
};

watch(() => props.id, loadProduct);
onMounted(loadProduct);
</script>
