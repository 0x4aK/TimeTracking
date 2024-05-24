<template>
  <p-card>
    <template #content>
      <div>
        <p-dropdown
          v-model="selectedWeek"
          :options="weekSelectorOptions"
          option-label="label"
          option-value="value"
          empty-message="Ei valittavia viikkoja"
          placeholder="Viikko"
        />
        <time-total />
      </div>
      <time-table />
    </template>
  </p-card>
</template>

<script lang="ts" setup>
const { spansByWeek, selectedWeek } = useWorkHours();

const weekSelectorOptions = computed(() => {
  if (!spansByWeek.value) return undefined;
  return Array.from(spansByWeek.value.keys()).map((week) => ({ value: week, label: `Viikko ${week}` }));
});
</script>

<style lang="scss" scoped></style>
