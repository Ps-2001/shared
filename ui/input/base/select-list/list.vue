<template>
  <ul
    v-show="show"
    class="select-list"
    :class="[classNames]"
  >
    <li v-for="item in list" >

      <Item
        :item="item"
        :value="value"
        @select="select"
      >

        <template #item-icon-before>
          <slot name="item-icon-before"></slot>
        </template>
        <template #item-icon-after>
          <slot name="item-icon-after"></slot>
        </template>

      </Item>

    </li>
  </ul>
</template>

<script setup>
import Item from './list-item.vue'
import { ref, computed } from "vue";

const props = defineProps(['show', 'list', 'value'])
const emit = defineEmits(['select'])

const show = ref(props.show)

const select = (payload) => emit('select', payload)

const classNames = computed(() => ({
  'popup-show': show,
  'popup-close': !show,
}))

</script>

<style scoped lang="sass">
.select-list
  position: absolute
  width: 100%
  max-height: 33svh
  background-color: white
  margin-top: .3rem
  border-radius: .5rem
  overflow-y: auto
  box-shadow: 0 7px 21px rgba(83,92,105,.12), 0 -1px 6px 0 rgba(83,92,105,.06)

.popup-show
  animation: popupShowAnimation 150ms
  animation-delay: 15ms
  animation-fill-mode: both

.popup-show
  //position: relative
  animation: popupCloseAnimation 150ms
  animation-delay: 15ms
  z-index: 100


</style>