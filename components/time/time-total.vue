<template>
  <div v-if="totalTime">
    <slot name="label">{{ label && `${label}: ` }}</slot>
    <slot name="time" :seconds="totalTime">
      <span class="text-nowrap">{{ secondsToHumanReadable(totalTime) || null }}</span>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { differenceInSeconds } from "date-fns";

const props = defineProps<{ spans: TimeSpan[] | null | undefined; label?: string }>();

const totalTime = computed(() => {
  if (!props.spans) return null;

  return props.spans.reduce(
    (total, span) => (span.active ? total + differenceInSeconds(span.end, span.start) : total),
    0,
  );
});
</script>
