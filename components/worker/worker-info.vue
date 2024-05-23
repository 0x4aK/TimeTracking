<template>
  <p-card>
    <template #content> {{ selectedWorkerData }} </template>
  </p-card>
</template>

<script lang="ts" setup>
const { selectedWorkerData } = useWorkers();
</script>

<style lang="scss" scoped></style>
