<template>
  <div class="tooltip-container" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <div class="tooltip-child">
      <slot></slot>
    </div>
    <div v-if="(isTooltipVisible || condition) && text" :class="['tooltip-content', position]">
      {{ text }}
      <div :class="['tooltip-arrow', position]"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['text', 'condition', 'position'])

const isTooltipVisible = ref(false)

const showTooltip = () => {
  isTooltipVisible.value = true
}

const hideTooltip = () => {
  isTooltipVisible.value = false
}
</script>

<style scoped lang="sass">
.tooltip-container
  position: relative
  display: inline-block

.tooltip-content
  position: absolute
  left: 50%
  display: block
  max-width: 50svw
  text-align: center
  transform: translateX(-50%)
  background-color: black
  color: white
  padding: 5px
  border-radius: 4px
  z-index: 100
  &.top
    bottom: 100%
  &.bottom
    top: 100%

.tooltip-arrow
  position: absolute
  left: 50%
  border-width: 5px
  border-style: solid
  transform: translateX(-50%)
  &.top
    top: 100%
    border-color: black transparent transparent transparent
  &.bottom
    bottom: 100%
    border-color: transparent transparent black transparent

.tooltip-child
  margin-top: 6px
  margin-bottom: 6px

@import "custom"
</style>
