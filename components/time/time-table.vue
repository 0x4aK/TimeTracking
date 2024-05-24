<template>
  <p-data-table :value="timeTableData" :pt="{ bodyRow: 'h-40', column: 'max-w-min' }">
    <template #empty><div class="text-center">Valitse työntekijä ja viikko</div></template>
    <p-column
      field="clock"
      header="Klo"
      :pt="{ headerCell: 'max-w-min !px-2', bodyCell: 'max-w-min align-top !px-2' }"
    />
    <p-column
      v-for="day of weekDays"
      :key="day.day"
      :field="day.day"
      :header="day.label"
      :pt="{ bodyCell: 'relative' }"
    >
      <template #body="{ data, field }">
        <time-span v-for="span in data[field]" :key="span.spanId" :span="span" @toggle="span.active = !span.active" />
      </template>
    </p-column>
  </p-data-table>
</template>

<script lang="ts" setup>
import { getDay, getHours } from "date-fns";

const weekDays = [
  { day: "1", label: "Ma" },
  { day: "2", label: "Ti" },
  { day: "3", label: "Ke" },
  { day: "4", label: "To" },
  { day: "5", label: "Pe" },
  { day: "6", label: "La" },
  { day: "0", label: "Su" },
] as const;

const { selectedWeeksSpans } = useWorkHours();

const timeTableData = computed(() => {
  if (!selectedWeeksSpans.value) return undefined;

  const [earliestHour, latestHour] = selectedWeeksSpans.value
    .reduce(
      ([earliest, latest], { start, end }) => {
        const [startTime, endTime] = [start.getTime(), end.getTime()];
        return [startTime < earliest ? startTime : earliest, endTime > latest ? endTime : latest];
      },
      [Infinity, -Infinity],
    )
    .map(getHours);

  const timeTableMap = new Map(
    Array.from({ length: latestHour - earliestHour + 1 })
      .fill(null)
      .map((_, index) => [
        earliestHour + index,
        Object.fromEntries(weekDays.map((day) => [+day.day, new Array<TimeSpan>()])),
      ]),
  );

  for (const span of selectedWeeksSpans.value) {
    const hourSpans = timeTableMap.get(getHours(span.start));
    if (hourSpans) hourSpans[getDay(span.start)].push(span);
  }

  return Array.from(timeTableMap).map(([hour, days]) => Object.assign({ clock: `${hour}` }, days));
});
</script>
