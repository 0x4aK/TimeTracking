<template>
  <p-card :pt="{ content: 'flex flex-col gap-4' }">
    <template #content>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <fileupload-input />
        <date-selector />
      </div>
      <p-listbox
        v-model="selectedUser"
        :options="Array.from(users.values())"
        data-key="id"
        option-label="name"
        option-value="id"
        empty-message="Ei käyttäjiä"
      />
    </template>
  </p-card>
</template>

<script lang="ts" setup>
const { users, selectedUser } = useUsers();
</script>
