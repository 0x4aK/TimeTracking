<template>
  <p-card>
    <template #content>
      <p-fieldset legend="Tiedot">
        {{ selected }}
      </p-fieldset>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
const { selected } = useWorkers();
</script>

<style lang="scss" scoped></style>
