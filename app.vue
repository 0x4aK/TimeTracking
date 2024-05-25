<template>
  <main class="flex min-h-dvh flex-wrap gap-2 bg-gradient-to-t from-primary-800 to-primary-400 p-2 md:p-6">
    <user-selector class="" />
    <user-info class="flex-grow" />
    <user-time-table class="basis-full" />
  </main>

  <fileupload-overlay />
  <loading-overlay :loading="loading" />
</template>

<script setup lang="ts">
const { loading: usersLoading } = useUserManager();
const loading = computed(() => [usersLoading.value].some(Boolean));
</script>
