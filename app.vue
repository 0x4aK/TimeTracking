<template>
  <main
    class="grid min-h-dvh grid-flow-row auto-rows-min grid-cols-5 gap-2 bg-gradient-to-t from-primary-800 to-primary-400 p-2 md:p-6"
  >
    <user-selector class="col-span-5 sm:col-span-2" />
    <user-info class="col-span-5 sm:col-span-3" />
    <user-time-table class="col-span-5" />
  </main>

  <fileupload-overlay />
  <loading-overlay :loading="loading" />
</template>

<script setup lang="ts">
const { loading: usersLoading } = useUserManager();
const loading = computed(() => [usersLoading.value].some(Boolean));
</script>
