<template>
  <p-card :pt="{ content: 'flex flex-col gap-2' }">
    <template #content>
      <div class="flex justify-between">
        <fileupload-input />
        <p-calendar v-model="selectedDate" date-format="dd.mm.yy" show-week variant="filled">
          <template #date="{ date }">
            <div class="relative h-full w-full">
              <span
                v-if="spansByDate?.has(`${date.day}.${date.month + 1}.${date.year}`)"
                class="absolute right-0 top-1 aspect-square h-1/6 rounded-full bg-orange-500/80"
              />
              <span class="absolute inset-0 inline-block text-center align-middle leading-relaxed">{{ date.day }}</span>
            </div>
          </template>
        </p-calendar>
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
const { selectedDate, spansByDate } = useTimeSpans();
</script>
