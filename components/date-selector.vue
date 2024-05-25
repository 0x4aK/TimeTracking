<template>
  <p-calendar v-model="selectedDate" variant="filled" show-week show-icon>
    <template #date="{ date }">
      <div class="relative h-full w-full">
        <span
          v-if="spansByDate?.has(`${date.day}.${date.month + 1}.${date.year}`)"
          class="absolute right-0 top-1 aspect-square h-1/6 rounded-full bg-orange-500/80"
        />
        <span class="absolute inset-0 inline-block text-center align-middle leading-relaxed">
          {{ date.day }}
        </span>
      </div>
    </template>
  </p-calendar>
</template>

<script lang="ts" setup>
const { selectedDate, spansByDate } = useTimeSpans();
</script>
