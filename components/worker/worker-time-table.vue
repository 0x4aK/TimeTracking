<template>
  <p-card>
    <template v-if="selectedWorkerData" #content>
      <div class="flex justify-between gap-4">
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
    <template v-else #content>
      <div class="flex h-full items-center justify-center font-semibold">Ei valittua työntekijää</div>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
const { spansByWeek, selectedWeek } = useWorkHours();
const { selectedWorkerData } = useWorkers();

const weekSelectorOptions = computed(() => {
  if (!spansByWeek.value) return undefined;
  return Array.from(spansByWeek.value.keys()).map((week) => ({ value: week, label: `Viikko ${week}` }));
});
</script>

<style lang="scss" scoped></style>
