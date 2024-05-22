<template>
  <card>
    <template #content>
      <listbox
        v-model="selected"
        :options="Array.from(workers.values())"
        data-key="id"
        option-label="name"
        empty-message="Ei työntekijöitä"
      />
    </template>
    <template #footer>
      <div class="flex justify-end">
        <fileupload-input />
      </div>
    </template>
  </card>
</template>

<script lang="ts" setup>
const { workers, selected } = useWorkers();
</script>
