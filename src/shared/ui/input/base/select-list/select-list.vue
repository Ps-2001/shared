<template>
  <div class="select base-input" :class="{'base-input--invalid': isError }" @click.stop >

    <div class="base-input-title">
      <p v-if="name" class="select-name" @click="toogle" >
        {{ name }}
      </p>
      <p class="base-input-title-required">*</p>
    </div>

    <Label ref="$label" @click="toogle" :text="text" :active="isOpen" :required="required" />

    <List
      v-show="isOpen"
      :list="list"
      :value="value"
      @select="choose"
    >

      <template #item-icon-before>
        <slot name="item-icon-before"></slot>
      </template>
      <template #item-icon-after>
        <slot name="item-icon-after"></slot>
      </template>

    </list>

    <span
        :class="['base-input-notification', { 'base-input-notification--error': isError , 'visible': notification?.text }]"
    >
      {{ notification?.text }}
    </span>

  </div>
</template>

<script setup>
import Label from './label.vue'
import List from './list.vue'
import {computed, onMounted, onBeforeUnmount, ref} from "vue";

const props = defineProps({
  id: String,
  label: String,
  modelValue: {
    default: 0
  },
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
  notification: Object,
  list: {
    type: Array,
    default: [{ id: 0, name: 'Не выбрано' }]
  },
  multiple: {
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'ref'])

const $label = ref()
const isOpen = ref(false)

let name = computed(() => props.label ? props.label + ':' : '' )
let value = computed(() => props.modelValue)
let text = computed(() => props.list.find( item => item.id == props.modelValue)?.name)
let isError = computed(() => props.notification?.type === 'error')

const choose = (payload) => {
  const { id, name } = payload

  isOpen.value = false
  emit('update:modelValue', id)
}

const toogle = () => isOpen.value = !isOpen.value

const openList = () => isOpen.value = true

const closeList = () => isOpen.value = false

onMounted(() => {
  document.querySelector('body').addEventListener('click', closeList)
})
onBeforeUnmount(() => {
  document.removeEventListener("click", closeList)
})

</script>

<style scoped lang="sass">
.select
  position: relative
  width: 100%
  &-name
    display: block
    cursor: default
    margin-bottom: .33rem
  &-label

.base-input
  &-title
    display: flex
    overflow: auto
    scrollbar-width: none
    &::-webkit-scrollbar
      display: none
    &-name
      margin-bottom: .33rem
    &-required
      margin-left: .3rem
      color: #e30000

  .select-label
    background-color: white
    border: 1px solid #e6e6e7
    &:hover
      border: 1px solid #bcbcbe
    &:focus
      border: 1px solid rgba(81, 203, 281)
    &:disabled
      background-color: #F7F7F7
      border: 1px solid transparent
      color: #9F9F9F

  &-notification
    display: block
    visibility: hidden
    height: 100%
    margin: 6px 0 0
    border-radius: 5px
    color: #fff
    background-color: #ff5050
    padding: 4px




.base-input--invalid
  .select-label
    border: 1px solid #e30000
    &:hover
      border: 1px solid #f11212
    &:focus
      border: 1px solid #b20000


@import "custom"

</style>