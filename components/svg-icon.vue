<template>
  <i class="inline-block aspect-square select-none" :style="{ height: `${size}em` }">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current">
      <g><path :d="path" /></g>
    </svg>
  </i>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ path: string; size: string | number }>(), { size: 1 });
</script>
