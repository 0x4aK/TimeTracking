<template>
  <main
    class="grid min-h-dvh grid-flow-row auto-rows-min grid-cols-5 gap-2 bg-gradient-to-tr from-teal-800 to-blue-600 p-2 md:p-6"
  >
    <worker-selector class="col-span-5 sm:col-span-2" />
    <worker-info class="col-span-5 sm:col-span-3" />
    <worker-time-table class="col-span-5" />
  </main>

  <fileupload-overlay />
  <loading-overlay :loading="loading" />
</template>

<script setup lang="ts">
const { loading: workersLoading } = useWorkers();
const loading = computed(() => [workersLoading.value].some(Boolean));
</script>
