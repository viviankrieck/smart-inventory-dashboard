<template>
  <q-page padding class="q-pb-xl">
    <!-- Estado de Loading -->
    <div v-if="loading" class="flex justify-center items-center h-[calc(100vh-150px)]">
      <q-spinner-cube color="primary" size="3.5rem" />
    </div>

    <!-- Conteúdo Principal -->
    <div v-else class="flex flex-col gap-6 max-w-7xl mx-auto">
      <!-- Cabeçalho do Dashboard -->
      <div class="flex justify-between items-center q-mb-sm">
        <div>
          <h1 class="text-h5 text-weight-bold q-my-none">Dashboard</h1>
          <p class="text-subtitle2 text-soft q-mb-none">Visão geral do estoque e movimentações</p>
        </div>
      </div>

      <!-- KPI Cards (Métricas) -->
      <div v-if="metrics" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <template v-for="[metricKey, value] in Object.entries(metrics)" :key="metricKey">
          <q-card
            flat
            bordered
            class="rounded-xl bg-dark-surface hover:border-primary/50 transition-all"
          >
            <q-card-section class="q-pa-md">
              <div class="flex justify-between items-start">
                <div>
                  <div class="text-caption text-weight-medium text-soft">
                    {{ getMetricConfig(metricKey).label }}
                  </div>
                  <div class="text-h5 text-weight-bolder q-mt-xs">
                    {{ formatMetricValue(metricKey, value) }}
                  </div>
                </div>

                <!-- Ícone com Container Suave -->
                <div
                  class="p-2.5 rounded-lg flex items-center justify-center"
                  :class="getMetricConfig(metricKey).bgClass"
                >
                  <q-icon
                    :name="getMetricConfig(metricKey).icon"
                    :color="getMetricConfig(metricKey).color"
                    size="22px"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </template>
      </div>

      <!-- Gráfico de Movimentações Mensais -->
      <q-card flat bordered class="rounded-xl bg-dark-surface">
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-weight-bold">Movimentações Mensais</div>
          <div class="text-caption text-soft">Entradas e saídas de produtos por mês</div>
        </q-card-section>

        <q-card-section>
          <vue-apex-charts
            height="320"
            :options="monthly_movements_chart_options"
            :series="monthly_movements_series"
          />
        </q-card-section>
      </q-card>

      <!-- Tabela de Produtos com Estoque Baixo -->
      <q-card flat bordered class="rounded-xl bg-dark-surface">
        <LowStockProductTable :low_stock_products="low_stock_products" />
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts';
import { computed, onMounted, ref } from 'vue';
import type { DashboardResponse } from 'src/interfaces/dashboard';
import { getDashboardData } from 'src/services/dashboard';
import LowStockProductTable from 'src/components/dashboard/LowStockProductTable.vue';

const loading = ref(false);
const dashboard_data = ref<DashboardResponse | null>(null);

onMounted(async () => {
  await getDashboard();
});

const metrics = computed(() => dashboard_data.value?.metrics || null);
const monthly_movements = computed(() => dashboard_data.value?.monthly_movements || []);
const low_stock_products = computed(() => dashboard_data.value?.low_stock_products || []);

const monthly_movements_series = computed(() => [
  {
    name: 'Entradas',
    data: monthly_movements.value.map((item) => item.entries),
  },
  {
    name: 'Saídas',
    data: monthly_movements.value.map((item) => item.exits),
  },
]);

// Configuração do ApexCharts integrada com Tema Dark
const monthly_movements_chart_options = computed(() => ({
  chart: {
    type: 'bar' as const,
    toolbar: { show: false },
    fontFamily: 'inherit',
    foreColor: '#94A3B8', // Cor dos textos dos eixos (Slate-400)
  },
  colors: ['#00E5FF', '#FF7043'], // Ciano (Entradas) e Coral (Saídas)
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '45%',
      borderRadius: 6,
    },
  },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 2, colors: ['transparent'] },
  grid: {
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  xaxis: {
    categories: monthly_movements.value.map((item) => item.month),
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  tooltip: {
    theme: 'dark' as const,
  },
}));

async function getDashboard() {
  loading.value = true;
  try {
    dashboard_data.value = await getDashboardData();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

// Configuração individual por tipo de métrica
function getMetricConfig(metricKey: string) {
  switch (metricKey) {
    case 'total_products':
      return {
        label: 'Total de Produtos',
        icon: 'inventory_2',
        color: 'primary',
        bgClass: 'bg-blue-500/10',
      };
    case 'total_categories':
      return {
        label: 'Total de Categorias',
        icon: 'category',
        color: 'purple',
        bgClass: 'bg-purple-500/10',
      };
    case 'inventory_value':
      return {
        label: 'Valor do Estoque',
        icon: 'attach_money',
        color: 'positive',
        bgClass: 'bg-emerald-500/10',
      };
    case 'low_stock_products':
      return {
        label: 'Estoque Baixo',
        icon: 'warning',
        color: 'negative',
        bgClass: 'bg-rose-500/10',
      };
    default:
      return {
        label: metricKey,
        icon: 'analytics',
        color: 'grey',
        bgClass: 'bg-grey-500/10',
      };
  }
}

// Formatação inteligente dos valores
function formatMetricValue(metricKey: string, value: number | string) {
  if (metricKey === 'inventory_value' && typeof value === 'number') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }
  return value;
}
</script>
