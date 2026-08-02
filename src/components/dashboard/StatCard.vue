<template>
  <q-card flat bordered class="stat-card">
    <q-card-section class="row items-center no-wrap">
      <div class="col">
        <div class="text-caption text-grey-7">{{ title }}</div>
        <div class="text-h5 text-weight-bold q-mt-xs">{{ value }}</div>
        <div v-if="subtitle" class="text-caption text-grey-6">{{ subtitle }}</div>
      </div>

      <q-icon :name="icon" size="26px" :color="color" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    value: string | number;
    icon: string;
    color?: string;
    subtitle?: string;
  }>(),
  { color: 'primary' },
);
</script>

<style scoped>
.stat-card {
  border-radius: 12px;
  height: 100%;
}
</style>
