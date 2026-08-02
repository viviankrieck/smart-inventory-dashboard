<template>
  <q-card flat bordered class="q-pa-sm chart-card">
    <q-card-section class="q-pb-none">
      <div class="text-subtitle1 text-weight-medium">Estoque por categoria</div>
      <div class="text-caption text-grey-7">Unidades em estoque nas categorias mais relevantes</div>
    </q-card-section>

    <q-card-section>
      <apexchart
        v-if="series.some((v) => v > 0)"
        type="donut"
        height="280"
        :options="chartOptions"
        :series="series"
      />
      <div v-else class="text-center text-grey-6 q-pa-lg">Sem dados suficientes para exibir o gráfico.</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ApexOptions } from 'apexcharts';
import { useSettingsStore } from 'src/stores/settings';

const props = defineProps<{
  labels: string[];
  series: number[];
}>();

const settingsStore = useSettingsStore();

const chartOptions = computed<ApexOptions>(() => ({
  chart: { fontFamily: 'inherit' },
  theme: { mode: settingsStore.darkMode ? 'dark' : 'light' },
  labels: props.labels,
  legend: { position: 'bottom' },
  colors: ['#155e75', '#0d9488', '#f59e0b', '#0284c7', '#dc2626', '#7c3aed'],
  dataLabels: { enabled: false },
  stroke: { width: 1 },
}));
</script>

<style scoped>
.chart-card {
  border-radius: 12px;
  height: 100%;
}
</style>
