<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
    <q-card
      v-for="product in products"
      :key="product.id"
      flat
      bordered
      class="flex flex-col h-full rounded-2xl border-slate-200 dark:border-slate-800 bg-neutral-100/20 dark:bg-slate-900 hover:shadow-md transition-shadow duration-200"
    >
      <!-- Conteúdo Principal -->
      <div class="p-4 grow flex flex-col justify-between gap-3">
        <!-- Cabeçalho: Imagem + Detalhes Principais -->
        <div class="flex items-start gap-3">
          <!-- Thumbnail com Badge de Status -->
          <div class="relative shrink-0">
            <q-avatar
              size="84px"
              class="bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-1"
            >
              <img
                :src="product.thumbnail || product.images[0]"
                :alt="product.title"
                class="object-contain"
              />
            </q-avatar>
          </div>

          <!-- Informações de Identificação -->
          <div class="grow min-w-0">
            <div class="flex items-center justify-between gap-1 mb-1">
              <span
                class="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
              >
                SKU: {{ product.sku }}
              </span>
              <!-- Status de Disponibilidade -->
              <q-badge
                rounded
                class="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase"
                :class="getStatusClass(product.stock, product.availabilityStatus)"
              >
                {{ product.availabilityStatus }}
              </q-badge>
            </div>

            <h3
              class="text-base font-semibold text-slate-800 dark:text-slate-100 truncate leading-snug"
              :title="product.title"
            >
              {{ product.title }}
            </h3>

            <p class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              {{ product.brand ? `${product.brand} • ` : '' }}{{ product.category }}
            </p>
          </div>
        </div>

        <!-- Métrica Crítica de Estoque (Destaque Visual) -->
        <div
          class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800/80"
        >
          <div class="flex justify-between items-center mb-1.5">
            <span
              class="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1"
            >
              <q-icon name="inventory_2" size="16px" class="text-slate-400" />
              Nível de Estoque
            </span>
            <span
              class="text-xs font-semibold"
              :class="
                product.stock <= 10
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-slate-700 dark:text-slate-200'
              "
            >
              {{ product.stock }} un. {{ product.stock <= 10 ? '(Estoque Baixo)' : '' }}
            </span>
          </div>

          <!-- Barra de Progresso do Estoque -->
          <q-linear-progress
            :value="Math.min(product.stock / 100, 1)"
            rounded
            size="6px"
            :color="getStockColor(product.stock)"
            class="bg-slate-200 dark:bg-slate-700"
          />
        </div>

        <!-- Meta Dados Rápidos (Dimensões e Barcode) -->
        <div class="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div class="flex items-center gap-1.5 truncate">
            <q-icon name="qr_code_2" size="16px" class="text-slate-400 shrink-0" />
            <span class="font-mono truncate" :title="product.meta.barcode">{{
              product.meta.barcode
            }}</span>
          </div>
          <div class="flex items-center gap-1.5 justify-end">
            <q-icon name="straighten" size="16px" class="text-slate-400 shrink-0" />
            <span
              >{{ product.dimensions.width }}x{{ product.dimensions.height }}x{{
                product.dimensions.depth
              }}
              cm</span
            >
          </div>
        </div>
      </div>

      <!-- Rodapé Operacional / Ações -->
      <q-separator class="border-slate-100 dark:border-slate-800" />

      <div
        class="p-3 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between rounded-b-2xl"
      >
        <!-- Preço e Qtd Mínima (Informativo secundário) -->
        <div>
          <span class="text-[10px] uppercase font-semibold text-slate-400 block leading-none"
            >Custo Un.</span
          >
          <span class="text-sm font-bold text-slate-700 dark:text-slate-200"
            >${{ product.price.toFixed(2) }}</span
          >
          <span class="text-[10px] text-slate-400 ml-1"
            >(Mín: {{ product.minimumOrderQuantity }})</span
          >
        </div>

        <!-- Botões de Ação Rápida de Estoque -->
        <div class="flex gap-1">
          <q-btn
            flat
            round
            dense
            icon="history"
            size="sm"
            class="text-slate-500 hover:text-indigo-600"
          >
            <q-tooltip class="bg-slate-800 text-xs">Histórico de Movimentações</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            dense
            icon="edit"
            size="sm"
            class="text-slate-500 hover:text-indigo-600"
          >
            <q-tooltip class="bg-slate-800 text-xs">Ajustar Estoque</q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import type { ProductI } from 'src/interfaces/product'; // Ajuste seu import

defineProps<{
  products: ProductI[];
}>();

// Helpers para cores e status baseados no volume de estoque
function getStockColor(stock: number): string {
  if (stock === 0) return 'negative';
  if (stock <= 10) return 'warning';
  return 'positive';
}

function getStatusClass(stock: number, status: string): string {
  if (stock === 0 || status.toLowerCase().includes('out')) {
    return 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400';
  }
  if (stock <= 10 || status.toLowerCase().includes('low')) {
    return 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400';
  }
  return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400';
}
</script>
