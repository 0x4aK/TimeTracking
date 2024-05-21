<template>
  <transition name="fade">
    <div v-if="loading" class="fixed inset-0 flex items-center bg-gray-600/50">
      <progress-spinner />
    </div>
  </transition>
</template>

<script lang="ts" setup>
defineProps<{ loading: boolean }>();
</script>

<style lang="scss" scoped></style>
