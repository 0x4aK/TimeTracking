<template>
  <p-card>
    <template v-if="selectedUserData && selectedDate" #content>
      <div class="flex justify-between gap-4">
        <span class="text-xl font-semibold">Viikko {{ getWeek(selectedDate) }}</span>
        <time-total :spans="selectedWeekSpans">
          <template #label> <span class="text-xs font-bold">Viikolta: </span> </template>
        </time-total>
      </div>
      <p-divider />
      <time-table />
    </template>
    <template v-else #content>
      <div class="flex h-full items-center justify-center font-semibold">
        Ei valittua käyttäjää ja päivää
      </div>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
const { selectedDate, selectedWeekSpans } = useTimeSpans();
const { selectedUserData } = useUsers();
</script>
