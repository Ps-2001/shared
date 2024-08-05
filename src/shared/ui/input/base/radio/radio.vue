<template>
<div class="label">

</div>
</template>

<script setup>
defineProps({
  label: String,
  options: {
    type: Array,
    default: [{ id: 0, name: 'без названия' }]
  }
})
</script>

<style scoped lang="sass">

@import "custom"
</style>