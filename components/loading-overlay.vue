<template>
  <transition name="fade">
    <div v-if="loading" class="fixed inset-0 flex items-center bg-surface-700/50">
      <p-progress-spinner />
    </div>
  </transition>
</template>

<script lang="ts" setup>
defineProps<{ loading: boolean }>();
</script>
