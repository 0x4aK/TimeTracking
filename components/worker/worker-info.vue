<template>
  <p-card :pt="{ body: 'h-full p-6', content: 'h-full' }">
    <template v-if="selectedWorkerData" #content>
      <div class="flex justify-between gap-4">
        <div><span class="text-xs font-bold">ID:</span> {{ selectedWorkerData.id }}</div>
        <div><span class="text-xs font-bold">Nimi:</span> {{ selectedWorkerData.name }}</div>
        <p-dropdown
          v-model="selectedDay"
          :options="daySelectorOptions"
          option-label="label"
          option-value="value"
          placeholder="Päivä"
          empty-message="Ei valittavia päiviä viikolta"
          show-clear
        />
      </div>
      <p-divider />
      <time-day-overview />
    </template>
    <template v-else #content>
      <div class="flex h-full items-center justify-center font-semibold">Ei valittua työntekijää</div>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
const { selectedWorkerData } = useWorkers();
const { spansByDay, selectedDay } = useWorkHours();

const daySelectorOptions = computed(() => {
  if (!spansByDay.value) return undefined;
  return Array.from(spansByDay.value.keys()).map((day) => ({ value: day, label: dayToName(day) }));
});
</script>

<style lang="scss" scoped></style>
