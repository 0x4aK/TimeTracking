<template>
  <p-card>
    <template v-if="selectedUserData && selectedDate" #content>
      <div class="flex justify-center gap-4 text-xl font-semibold">
        Viikko {{ getWeek(new Date(selectedDate)) }}
        <time-total />
      </div>
      <time-table />
    </template>
    <template v-else #content>
      <div class="flex h-full items-center justify-center font-semibold">Ei valittua käyttäjää ja päivää</div>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
const { selectedDate } = useTimeSpans();
const { selectedUserData } = useUsers();
</script>

<style lang="scss" scoped></style>
