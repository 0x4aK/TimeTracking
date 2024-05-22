<template>
  <file-upload
    name="file"
    mode="basic"
    accepts=".csv"
    choose-label="Lataa cvs"
    auto
    @upload="(e) => setWorkersFromCSV(Array.isArray(e.files) ? e.files[0] : e.files)"
  />
</template>

<script lang="ts" setup>
const { setWorkersFromCSV } = useWorkers();
</script>
