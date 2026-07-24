<template>
  <div class="row items-center no-wrap q-gutter-x-xs w-max">
    <!-- Componente de estrelas do Quasar -->
    <q-rating
      :model-value="product.rating"
      size="1rem"
      icon="star_border"
      icon-selected="star"
      icon-half="star_half"
      max="5"
      readonly
      :class="rate_class(product)"
    />

    <!-- Valor numérico da nota -->
    <span class="text-weight-bold q-ml-xs">
      {{ product.rating }}
    </span>
  </div>
</template>
<script setup lang="ts">
/* INTERFACES */
import type { ProductI } from 'src/interfaces/product';
/* UTILS */
import { rate_class } from 'src/utils/products';

const { product } = defineProps<{
  product: ProductI;
}>();
</script>
