<template>
  <p-card :pt="{ body: 'h-full p-6', content: 'h-full' }">
    <template v-if="selectedUserData" #content>
      <div class="flex justify-between gap-4">
        <div><span class="text-xs font-bold">ID:</span> {{ selectedUserData.id }}</div>
        <div><span class="text-xs font-bold">Nimi:</span> {{ selectedUserData.name }}</div>
      </div>
      <p-divider />
      <time-day-overview />
    </template>
    <template v-else #content>
      <div class="flex h-full items-center justify-center font-semibold">Ei valittua käyttäjää</div>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
const { selectedUserData } = useUsers();
</script>
