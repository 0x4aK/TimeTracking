<template>
  <div v-if="totalTime">
    <slot name="label">{{ label && `${label}: ` }}</slot>
    <slot name="time" :value="totalTime">{{ totalTime }}</slot>
  </div>
</template>

<script lang="ts" setup>
import { differenceInSeconds } from "date-fns";

const props = defineProps<{ spans: TimeSpan[] | null | undefined; label?: string }>();

const totalTime = computed(() => {
  if (!props.spans) return null;

  const seconds = props.spans.reduce(
    (total, span) => (span.active ? total + differenceInSeconds(span.end, span.start) : total),
    0,
  );

  return secondsToHumanReadable(seconds) || null;
});
</script>
