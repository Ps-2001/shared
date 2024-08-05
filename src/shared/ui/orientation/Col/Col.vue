<template>
  <Flex
    direction="row"
    v-bind:props
  >
    <slot></slot>
  </Flex>
</template>

<script setup>
import { ref } from 'vue'
import Flex from '../Flex/Flex.vue'

const props = defineProps({
  max: Boolean,
  wrap: String,
  gap: Number,
})

</script>

<style scoped lang="sass">

</style>
