<template>
  <main
    class="flex min-h-dvh flex-wrap items-stretch gap-2 bg-gradient-to-t from-primary-800 to-primary-400 p-2 md:p-6"
  >
    <user-selector class="flex-auto" />
    <user-info class="flex-auto" />
    <user-time-table class="flex-auto basis-full overflow-auto" />
  </main>

  <fileupload-overlay />
  <loading-overlay :loading="loading" />
</template>

<script setup lang="ts">
const { loading: usersLoading } = useUserManager();
const loading = computed(() => [usersLoading.value].some(Boolean));
</script>
