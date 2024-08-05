<template>
  <div class="item" :class="classNames" @click="select" >
    <i class="icon">
      <slot name="item-icon-before"></slot>
    </i>

    <span>
      {{ item.name }}
    </span>

    <i class="icon">
      <slot name="item-icon-after"></slot>
    </i>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(['value', 'item', 'select'])
const emit = defineEmits(['select'])

const classNames = computed(() => ({
  'select': +props.item.id === +props.value,
  'disabled': props.item?.disabled
}))

const select = () => emit('select', props.item)

</script>

<style scoped lang="sass">
.item
  padding: .5rem
  margin: .25rem 0
  cursor: pointer
  transition: ease-in .5s
  border-bottom: none
  &:hover
    background-color: #ebeff2

.select
  background-color: #ebeff2
  & > span
    font-weight: 500

.disabled
  opacity: .5
  pointer-events: none

</style>