<template>
  <q-page padding>
    <div class="flex flex-col gap-4">
      <q-card>
        <q-card-section>
          <div class="text-h6">Dashboard</div>
          <div class="text-subtitle2">Visão geral do estoque e movimentações</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="flex gap-4" v-if="metrics">
            <template v-for="[metric, value] in Object.entries(metrics)">
              <div
                class="bg-primary-500/40 border border-primary-500 text-primary-500 rounded-lg shadow p-3 mb-3 flex-1 text-center"
              >
                <q-card-section>
                  <div class="text-h6">{{ normalizeMetricName(metric) }}</div>
                  <div class="text-h4">{{ value }}</div>
                </q-card-section>
              </div>
            </template>
          </div>
        </q-card-section>
      </q-card>
      <q-card>
        <vue-apex-charts
          height="350"
          :options="monthly_movements_chart_options"
          :series="monthly_movements_series"
        />
      </q-card>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts';
import { computed, onMounted, ref } from 'vue';
import { DashboardResponse } from 'src/interfaces/dashboard';
import { getDashboardData } from 'src/services/dashboard';

const loading = ref(false);
const dashboard_data = ref<DashboardResponse | null>(null);

const data = {
  chartOptions: {
    chart: {
      id: 'vuechart-example',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  },
  series: [
    {
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70, 91],
    },
  ],
};

onMounted(() => {
  void getDashboard();
});

const metrics = computed(() => {
  if (!dashboard_data.value) return null;
  return dashboard_data.value.metrics;
});

const monthly_movements = computed(() => {
  if (!dashboard_data.value) return [];
  return dashboard_data.value.monthly_movements;
});

const low_stock_products = computed(() => {
  if (!dashboard_data.value) return [];
  return dashboard_data.value.low_stock_products;
});

const recent_movements = computed(() => {
  if (!dashboard_data.value) return [];
  return dashboard_data.value.recent_movements;
});

const monthly_movements_series = computed(() => {
  if (!dashboard_data.value) return [];
  return [
    {
      name: 'Entradas',
      data: monthly_movements.value.map((item) => item.entries),
    },
    {
      name: 'Saídas',
      data: monthly_movements.value.map((item) => item.exits),
    },
  ];
});

const monthly_movements_chart_options = computed(() => {
  return {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: monthly_movements.value.map((item) => item.month),
    },
  };
});

/* METHODS */
async function getDashboard() {
  loading.value = true;
  try {
    const response = await getDashboardData();
    dashboard_data.value = response;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

function normalizeMetricName(metric: string) {
  switch (metric) {
    case 'total_products':
      return 'Total de Produtos';
    case 'total_categories':
      return 'Total de Categorias';
    case 'inventory_value':
      return 'Valor do Estoque';
    case 'low_stock_products':
      return 'Produtos com Estoque Baixo';
    default:
      return metric;
  }
}
</script>
