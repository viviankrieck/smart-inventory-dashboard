<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
    <q-card
      v-for="i in 4"
      :key="i"
      flat
      bordered
      class="flex flex-col h-full rounded-2xl border-slate-200 dark:border-slate-800 bg-neutral-100/20 dark:bg-slate-900 hover:shadow-md transition-shadow duration-200"
    >
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" animation="fade" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" animation="fade" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" animation="fade" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-skeleton height="100px" square animation="fade" />

      <q-card-section>
        <q-skeleton type="text" class="text-subtitle2" animation="fade" />
        <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts"></script>
