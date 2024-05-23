<template>
  <p-card>
    <template #content>
      <p-listbox
        v-model="selectedWorker"
        :options="Array.from(workers.values())"
        data-key="id"
        option-label="name"
        option-value="id"
        empty-message="Ei työntekijöitä"
      />
    </template>
    <template #footer>
      <div class="flex justify-end">
        <fileupload-input />
      </div>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
const { workers, selectedWorker } = useWorkers();
</script>
