<template>
  <p-data-table :value="tableData" :pt="{ bodyRow: 'h-40', column: 'max-w-min' }">
    <template #empty><div class="text-center">Ei dataa viikolta</div></template>
    <p-column
      field="clock"
      header="Klo"
      :pt="{ headerCell: 'max-w-min !px-2', bodyCell: 'max-w-min align-top !px-2' }"
    />
    <p-column
      v-for="day of WEEKDAYS"
      :key="day.day"
      :field="day.day"
      :header="day.label"
      :pt="{ bodyCell: 'relative', headerCell: 'min-w-24' }"
    >
      <template #body="{ data, field }">
        <time-span v-for="span in data[field]" :key="span.spanId" :span="span" @toggle="span.active = !span.active" />
      </template>
    </p-column>
  </p-data-table>
</template>

<script lang="ts" setup>
import { getDay, getHours } from "date-fns";

const { selectedWeekSpans } = useTimeSpans();

const tableData = computed(() => {
  if (!selectedWeekSpans.value) return null;

  const [earliestHour, latestHour] = selectedWeekSpans.value
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
        Object.fromEntries(WEEKDAYS.map((day) => [+day.day, new Array<TimeSpan>()])),
      ]),
  );

  for (const span of selectedWeekSpans.value) {
    const hourSpans = timeTableMap.get(getHours(span.start));
    if (hourSpans) hourSpans[getDay(span.start)].push(span);
  }

  return Array.from(timeTableMap).map(([hour, days]) => Object.assign({ clock: `${hour}` }, days));
});
</script>
