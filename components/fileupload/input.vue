<template>
  <p-file-upload
    name="file"
    mode="basic"
    accepts=".csv"
    choose-label="Lataa cvs"
    auto
    custom-upload
    @uploader="({ files }) => setUsersAndTimeSpansFromCSV(Array.isArray(files) ? files[0] : files)"
  />
</template>

<script lang="ts" setup>
const { setUsersAndTimeSpansFromCSV } = useUserManager();
</script>
