<template>
  <button
    class="absolute z-50 min-h-2 w-9/12 max-w-full rounded-md"
    :class="[span.active ? 'bg-primary' : 'bg-primary-highlight-inverse']"
    :style="spanStyle"
    @click="$emit('toggle')"
  />
</template>

<script lang="ts" setup>
import { differenceInMilliseconds, getMinutes } from "date-fns";

defineEmits<{ toggle: [] }>();
const props = defineProps<{ span: TimeSpan }>();

const spanStyle = computed(() => ({
  top: `${(getMinutes(props.span.start) / 60) * 1}rem`,
  height: `${differenceInMilliseconds(props.span.end, props.span.start) / 1_000_000}rem`,
}));
</script>

<style lang="scss" scoped></style>
