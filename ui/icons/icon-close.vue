<template>
  <svg :width="width" :height="height" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.54526 7.18193L1.1813 0.817966M1.1813 7.18193L7.54526 0.817966" :stroke="border"/>
  </svg>
</template>

<script setup>
const props = defineProps(['width', 'height', 'color', 'border'])
</script>

<style scoped lang="sass">

</style>