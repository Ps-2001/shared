<template>
  <svg :width="width" :height="height" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.803641 0.676828C0.42984 1.05063 0.42984 1.65668 0.803641 2.03048L8.24874 9.47559L0.803641 16.9207C0.429839 17.2945 0.429839 17.9005 0.803641 18.2743C1.17744 18.6481 1.78349 18.6481 2.1573 18.2743L10.9561 9.47559L2.1573 0.676828C1.78349 0.303026 1.17744 0.303026 0.803641 0.676828Z" :fill="color"/>
    </svg>
</template>

<script setup>
const props = defineProps(['width', 'height', 'color'])
</script>

<style scoped lang="sass">

</style>