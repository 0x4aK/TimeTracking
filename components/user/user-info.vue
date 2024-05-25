<template>
  <p-card>
    <template v-if="selectedUserData" #content>
      <div class="flex items-end justify-between gap-4">
        <div>
          <div><span class="text-xs font-bold">ID:</span> {{ selectedUserData.id }}</div>
          <div><span class="text-xs font-bold">Nimi:</span> {{ selectedUserData.name }}</div>
        </div>
        <time-total :spans="selectedDateSpans">
          <template #label> <span class="text-xs font-bold">Päivältä: </span> </template>
        </time-total>
      </div>
      <p-divider />
      <time-overview />
    </template>
    <template v-else #content>
      <div class="flex items-center justify-center font-semibold">Ei valittua käyttäjää</div>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
const { selectedUserData } = useUsers();
const { selectedDateSpans } = useTimeSpans();
</script>
