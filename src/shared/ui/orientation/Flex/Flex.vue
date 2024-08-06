<template>
  <div :class="classes">
    {{ props }}
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  max: Boolean,
  direction: String,
  wrap: String,
  gap: [Number, String],
})
const { max, direction, wrap, gap } = toRefs(props)


const classes = computed(() => ([
  'Flex',
  max.value && 'max',
  gap.value && `gap-${gap.value}`,
  {
    row: direction.value === 'row',
    col: direction.value === 'col',
    wrap: wrap.value === 'wrap',
    nowrap: wrap.value === 'nowrap',
  }
]))

</script>

<style scoped lang="sass">
@import "style"
</style>
