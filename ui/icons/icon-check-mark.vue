<template>
  <svg :width="width" :height="height" :fill="color" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
    <path
      d="m13.5 21.75h-.05a1 1 0 0 1 -.72-.37l-4.5-5.5a1 1 0 0 1 1.54-1.26l3.41 4.16a.56.56 0 0 0 .84 0l8.27-8.28a1 1 0 0 1 1.42 1.5l-9.5 9.5a1 1 0 0 1 -.71.25z"
    />
</svg>
</template>

<script setup>
const props = defineProps(['width', 'height', 'color'])
</script>

<style scoped lang="sass">

</style>