<template>
  <div>{{ totalTimeDate }}</div>
</template>

<script lang="ts" setup>
import { differenceInSeconds } from "date-fns";

const { selectedWeeksSpans } = useWorkHours();

const totalTimeDate = computed(() => {
  if (!selectedWeeksSpans.value) return null;

  return selectedWeeksSpans.value.reduce((total, span) => {
    if (!span.active) return total;
    return total + differenceInSeconds(span.end, span.start);
  }, 0);
});
</script>

<style lang="scss" scoped></style>
