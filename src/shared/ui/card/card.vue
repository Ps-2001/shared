<template>
<div :class="classes" :style="style">
  <slot></slot>
</div>
</template>

<script setup>

import { computed, toRefs } from "vue"
import { Spinner } from "@/shared/ui/spiner"
import { getMargin, getPadding } from "@/shared/lib/main/useStyle.js"

const props = defineProps({
  variant: String,
  loading: Boolean,
  disabled: Boolean,
  padding: [Array, String],
  margin: [Array, String],
  max: Boolean,
})

const { variant, loading, disabled, padding, margin, max } = toRefs(props)

const classes = computed(() => ([
  'Card',
  loading.value && 'loading',
  disabled.value && `disabled`,
  max.value && `max`,
  {
    fill: variant.value === 'fill',
  }
]))

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
.Card
  //box-shadow: -1px 3px 14px -4px rgba(53, 84, 108, 0.33)
  border-radius: 3px
  background-color: #ffffff
  box-shadow: 0px 3px 7px 1px rgba(53, 84, 108, 0.33)
  &:hover
    box-shadow: 0px 3px 7px 3px rgba(53, 84, 108, 0.33)

</style>
