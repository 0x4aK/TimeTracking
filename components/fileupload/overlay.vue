<template>
  <transition name="fade">
    <div
      v-if="dragOver"
      class="fixed inset-0 bg-primary/20"
      @drop.prevent="handleFileDrop"
      @dragover.prevent="handleDrag"
      @dragexit="dragOver = false"
    >
      <div class="pointer-events-none flex h-full flex-col items-center justify-center text-white">
        <svg-icon :path="mdiFileUploadOutline" size="8" />
        <span class="text-xl font-semibold">Lataa tiedosto tiputtamalla tähän</span>
      </div>
      <div class="absolute right-4 top-4">
        <p-button text @click="dragOver = false">
          <svg-icon class="text-neutral-400" :path="mdiCloseThick" :size="3" />
        </p-button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { mdiCloseThick, mdiFileUploadOutline } from "@mdi/js";

const dragOver = ref(false);
useEventListener(document, "dragenter", () => (dragOver.value = true));

function handleDrag({ dataTransfer }: DragEvent) {
  if (!dataTransfer) return;
  dataTransfer.dropEffect = dataTransfer.items.length === 1 ? "copy" : "none";
}

const { setUsersAndTimeSpansFromCSV } = useUserManager();
function handleFileDrop(e: DragEvent) {
  dragOver.value = false;
  if (!e.dataTransfer || e.dataTransfer.files.length !== 1) return;
  setUsersAndTimeSpansFromCSV(e.dataTransfer.files[0]);
}
</script>

<style lang="scss" scoped></style>
