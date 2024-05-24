<template>
  <div v-if="selectedDaysSpans" class="flex flex-col gap-2">
    <div v-for="span in selectedDaysSpans" :key="span.spanId" class="flex items-center gap-1">
      <span v-text="formatDate(span.start)"></span>
      <svg-icon class="text-green-500" :path="mdiWalk" />
      <svg-icon :path="mdiArrowRightThin" />
      <svg-icon class="text-red-500" :path="mdiExitRun" />
      <span v-text="formatDate(span.end)"></span>
      <p-button class="ml-auto" text @click="span.active = !span.active">
        <svg-icon v-if="span.active" :path="mdiCheckBold" class="text-green-500" />
        <svg-icon v-else :path="mdiCloseThick" class="text-red-500" />
      </p-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { lightFormat } from "date-fns";
import { mdiExitRun, mdiWalk, mdiArrowRightThin, mdiCheckBold, mdiCloseThick } from "@mdi/js";

const { selectedDaysSpans } = useWorkHours();

const formatDate = (date: Date) => lightFormat(date, "H:mm:ss");
</script>

<style lang="scss" scoped></style>
