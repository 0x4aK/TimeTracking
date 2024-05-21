<template>
  <transition name="fade">
    <div
      v-if="dragOver"
      class="fixed inset-0 bg-blue-900/20"
      @drop.prevent="handleFileDrop"
      @dragover.prevent="handleDrag"
      @dragexit="dragOver = false"
    >
      <div class="pointer-events-none flex h-full flex-col items-center justify-center text-white">
        <svg-icon :path="mdiFileUploadOutline" size="8" />
        <span class="text-xl font-semibold">Lataa tiedosto tiputtamalla tähän</span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { mdiFileUploadOutline } from "@mdi/js";

const dragOver = ref(false);
useEventListener(document, "dragenter", () => (dragOver.value = true));

function handleDrag(e: DragEvent) {
  if (!e.dataTransfer) return;
  e.dataTransfer.dropEffect = e.dataTransfer.items.length === 1 ? "copy" : "none";
}

const { setWorkersFromCSV } = useWorkers();
function handleFileDrop(e: DragEvent) {
  dragOver.value = false;
  if (!e.dataTransfer || e.dataTransfer.files.length !== 1) return;
  setWorkersFromCSV(e.dataTransfer.files[0]);
}
</script>

<style lang="scss" scoped></style>
