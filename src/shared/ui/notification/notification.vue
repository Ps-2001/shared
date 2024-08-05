<template>
  <teleport to="body">
    <div class="bg">
      <h4 class="title">{{ title }}</h4>
      <p class="text">{{ text }}</p>
    </div>
  </teleport>
</template>

<script setup>
defineProps(['title', 'text', 'type'])
</script>

<style scoped lang="sass">
.bg
  padding: .5rem .7rem
  background-color: rgba(0, 0, 0, .3)
  h4, p
    color: #FFF
</style>