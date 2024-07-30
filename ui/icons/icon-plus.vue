<template>
  <svg :width="width" :height="height" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="20" height="20" rx="10" :stroke="border"/>
    <line x1="16" y1="10.5" x2="5" y2="10.5" :stroke="border"/>
    <line x1="10.5" y1="16" x2="10.5" y2="5" :stroke="border"/>
  </svg>
</template>

<script setup>
const props = defineProps(['width', 'height', 'color', 'border'])
</script>

<style scoped lang="sass">

</style>