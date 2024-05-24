<template>
  <div v-if="totalTime" class="text-xl font-semibold">Työtunteja viikolta: {{ totalTime }}</div>
</template>

<script lang="ts" setup>
import { differenceInSeconds } from "date-fns";

const { selectedWeeksSpans } = useWorkHours();

const totalTime = computed(() => {
  if (!selectedWeeksSpans.value) return null;

  const seconds = selectedWeeksSpans.value.reduce(
    (total, span) => (span.active ? total + differenceInSeconds(span.end, span.start) : total),
    0,
  );

  const results: string[] = [];
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) results.push(`${hours}h`);
  if (minutes > 0) results.push(`${minutes}m`);

  return results.join(" ") || null;
});
</script>

<style lang="scss" scoped></style>
