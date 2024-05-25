<template>
  <div v-if="totalTime">Kokonais aikaa viikolta: {{ totalTime }}</div>
</template>

<script lang="ts" setup>
import { differenceInSeconds } from "date-fns";

const { selectedWeekSpans } = useTimeSpans();

const totalTime = computed(() => {
  if (!selectedWeekSpans.value) return null;

  const seconds = selectedWeekSpans.value.reduce(
    (total, span) => (span.active ? total + differenceInSeconds(span.end, span.start) : total),
    0,
  );

  const results: string[] = [];
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) results.push(`${hours}t`);
  if (minutes > 0) results.push(`${minutes}m`);

  return results.join(" ") || null;
});
</script>
