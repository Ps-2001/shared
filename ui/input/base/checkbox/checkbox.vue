<template>
  <label class="label" @click="onClick" :class="['base-input', { 'base-input--invalid': isError }]">

    <span class="input">
      <span class="checkbox">
        <span v-if="state" class="bg">
          <IconCheckMark width="1.4rem" height="1.4rem" color="white" />
        </span>
        <span v-if="!state" class="icon"></span>
      </span>

      <span class="base-input-title">
        <p v-if="name" class="base-input-title-name" >{{ name }}</p>
        <p v-if="required" class="base-input-title-required">*</p>
      </span>
    </span>


    <span
        :class="['base-input-notification', { 'base-input-notification--error': isError , 'visible': notification?.text }]"
    >
      {{ notification?.text || '&nbsp;' }}
    </span>

  </label>
</template>

<script setup>
import {computed, ref} from "vue";
import { IconCheckMark } from "@/shared/ui/icons/index.js";

const props = defineProps({
  id: String,
  label: String,
  type: String,
  modelValue: String,
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
  notification: Object,
})
const emit = defineEmits(['update:modelValue', 'blur', 'setValid', 'change'])

const $Input = ref()
const state = ref(!!props?.modelValue)

let name = computed(() => props.label || '' )
let isError = computed(() => props.notification?.type === 'error')

const onClick = () => {

  state.value = !state.value

  emit('update:modelValue', state.value)
  emit('change', state.value)
}

</script>

<style scoped lang="sass">
.label
  display: flex
  align-items: center
  &:hover > .checkbox
    border: 1px solid #bcbcbe
  .name
    margin-left: .33rem
  .checkbox
    position: relative
    background-color: #FFF
    padding: .7rem
    border: 1px solid #e6e6e7
    border-radius: .33rem
    overflow: hidden
    &:focus
      border: 1px solid rgba(81, 203, 281)
    .bg, .icon
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .bg
      background-color: rgba(81, 203, 281)
    .icon
      background-color: white

.base-input
  display: block
  &-title
    display: flex
    overflow: auto
    scrollbar-width: none
    &::-webkit-scrollbar
      display: none
    &-name
      margin-left: .33rem
    &-required
      margin-left: .3rem
      color: #e30000
  .input
    display: flex
    align-items: center
    margin-bottom: .33rem

  &-notification
    display: block
    visibility: hidden
    height: 100%
    margin: 6px 0 0
    border-radius: 5px
    color: #fff
    background-color: #ff5050
    padding: 4px


  input
    background-color: white
    border: 1px solid #d6d6d7
    &:hover
      border: 1px solid #bcbcbe
    &:focus
      border: 1px solid rgba(81, 203, 281)


.base-input--invalid
  input
    border: 1px solid #e30000
    &:hover
      border: 1px solid #f11212
    &:focus
      border: 1px solid #b20000

@import "custom"
</style>