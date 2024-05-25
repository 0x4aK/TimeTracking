<template>
  <p-file-upload
    name="file"
    mode="basic"
    accepts=".csv"
    choose-label="Lataa cvs"
    auto
    custom-upload
    @uploader="(e) => setUsersAndTimeSpansFromCSV(Array.isArray(e.files) ? e.files[0] : e.files)"
  />
</template>

<script lang="ts" setup>
const { setUsersAndTimeSpansFromCSV } = useUserManager();
</script>
