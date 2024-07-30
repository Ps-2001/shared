<template>
  <svg :width="width" :height="height" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1534 0.676828C10.5272 1.05063 10.5272 1.65668 10.1534 2.03048L2.70829 9.47559L10.1534 16.9207C10.5272 17.2945 10.5272 17.9005 10.1534 18.2743C9.77959 18.6481 9.17354 18.6481 8.79973 18.2743L0.000976451 9.47559L8.79973 0.676828C9.17354 0.303026 9.77959 0.303026 10.1534 0.676828Z" :fill="color"/>
  </svg>
</template>

<script setup>
const props = defineProps(['width', 'height', 'color'])
</script>

<style scoped lang="sass">

</style>