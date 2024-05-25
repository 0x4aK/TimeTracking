<template>
  <button
    class="absolute z-50 min-h-4 w-9/12 max-w-full overflow-clip whitespace-break-spaces rounded-md text-xs"
    :class="[span.active ? 'bg-primary' : 'bg-primary-highlight-inverse']"
    :style="spanStyle"
    @click="$emit('toggle')"
  >
    {{ formatTime(span.start) }} - {{ formatTime(span.end) }}
  </button>
</template>

<script lang="ts" setup>
import { differenceInMilliseconds, getMinutes } from "date-fns";

defineEmits<{ toggle: [] }>();
const props = defineProps<{ span: TimeSpan }>();

const spanStyle = computed(() => ({
  top: `${(getMinutes(props.span.start) / 60) * 100}%`,
  height: `${(differenceInMilliseconds(props.span.end, props.span.start) / (60 * 60 * 1_000)) * 100}%`,
}));
</script>

<style lang="scss" scoped></style>
