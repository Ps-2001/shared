<template>
  <svg :width="width" :height="height" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      :fill="color"
      d="m8.11997 9.29006 3.88003 3.88004 3.88-3.88004c.39-.39 1.02-.39 1.41 0s.39 1.02004 0 1.41004l-4.59 4.59c-.39.39-1.02.39-1.41 0l-4.59003-4.59c-.39-.39-.39-1.02004 0-1.41004.39-.38 1.03-.39 1.42 0z"
    />
  </svg>
</template>

<script setup>
const props = defineProps(['width', 'height', 'color'])
</script>

<style scoped lang="sass">

</style>