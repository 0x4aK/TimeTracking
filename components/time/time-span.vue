<template>
  <button
    class="absolute inset-x-4 z-50 flex min-h-4 flex-col justify-between overflow-clip rounded-md px-2 text-xs"
    :class="[span.active ? 'bg-primary' : 'bg-primary-highlight-inverse']"
    :style="spanStyle"
    @click="$emit('toggle')"
  >
    <span v-text="formatTime(span.start)" />
    <span v-text="formatTime(span.end)" />
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
