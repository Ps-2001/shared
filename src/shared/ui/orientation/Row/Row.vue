<template>
  <Flex
      direction="col"
      v-bind="props"
      :style="style"
  >
    <slot></slot>
  </Flex>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'
import Flex from '../Flex/Flex.vue'
import { getMargin, getPadding } from "@/shared/lib/main/useStyle.js"

const props = defineProps({
  max: Boolean,
  wrap: String,
  gap: Number,
  padding: [Array, String],
  margin: [Array, String],
})

const { max, wrap, gap, disabled, padding, margin } = toRefs(props)

const style = computed(() => {
  const marginValue = getMargin(margin.value)
  const paddingValue = getPadding(padding.value)

  return {
    ...({ margin: marginValue || {} }),
    ...({ padding: paddingValue || {} }),
  }
})

</script>

<style scoped lang="sass">

</style>
