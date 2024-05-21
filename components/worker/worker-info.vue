<template>
  <card>
    <template #content>
      <Fieldset legend="Tiedot">
        {{ selected }}
      </Fieldset>
    </template>
  </card>
</template>

<script lang="ts" setup>
const { selected } = useWorkers();
</script>

<style lang="scss" scoped></style>
