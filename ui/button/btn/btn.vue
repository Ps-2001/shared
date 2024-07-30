<template>
  <button
    class="btn"
    :class="[classNames, type]"
    :disabled="disabled"
  >
    <Spinner v-if="loading" />
    <i class="icon" />

    <slot />

    <i class="icon" />
  </button>
</template>

<script setup>
import { Spinner } from "@/shared/ui/spiner/index.js";
import { computed } from "vue";

const props = defineProps(['classNames', 'type', 'loading', 'disabled'])

const classNames = computed(() => ({
  ...props.classNames,
  'disabled': props.disabled || props.loading
}))

const type = computed(() => props.type || 'full')

</script>

<style scoped lang="sass">
.disabled
  pointer-events: none
  opacity: .5

i
  display: block

.btn
  display: flex
  padding: .8em 1em
  background-color: #e7e7e7
  border-radius: 1px
  border: 1px transparent solid
  &:hover
    background-color: #e3e3e3
  &:active
    background-color: #dedede

@import "custom"

</style>