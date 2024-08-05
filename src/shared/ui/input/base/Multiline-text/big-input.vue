<template>
  <label class="label" :class="['base-input', { 'base-input--invalid': isError }]">

    <!-- название -->
    <span class="head flex-horiz">

      <span class="base-input-title">
        <p v-if="name" class="base-input-title-name" >{{ name }}</p>
        <p v-if="required" class="base-input-title-required">*</p>
      </span>

      <Count
        v-if="textLengthMax"
        name="count"
        :value="text"
        :length="textLength"
        :max="textLengthMax"
        @stop="update"
      />

    </span>

    <!-- поле -->
    <textarea
      ref="$Textarea"
      :class="['textarea', {  }]"
      :disabled="disabled"
      :rows="textHeight"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />

    <!-- уведомление -->
    <span
        :class="['base-input-notification', { 'base-input-notification--error': isError , 'visible': notification?.text }]"
    >
      {{ notification?.text }}
    </span>

  </label>
</template>

<script setup>
import {computed, ref} from "vue";
import Count from './count.vue'

const props = defineProps({
  id: String,
  label: String,
  type: String,
  modelValue: String,
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
  notification: Object,
  rows: {
    default: 5
  },
  max: {
    default: 300
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'setValid', 'change'])

const $Textarea = ref()

const text = computed(() => String(props.modelValue))
const textLength = computed(() => String(props.modelValue).length || 0)
const textLengthMax = computed(() => +props.max || 0)
const textHeight = computed(() => +props.rows || 6)
let name = computed(() => props.label || '' )
let isError = computed(() => props.notification?.type === 'error')

const onInput = () => {

  emit('update:modelValue', $Textarea.value.value)
  emit('change', $Textarea.value.value)
}

const update = (payload) => emit('update:modelValue', payload.value)

</script>

<style scoped lang="sass">
.label
  display: flex
  flex-direction: column
  .head
    display: flex
    justify-content: space-between
    margin-bottom: .33rem
    .count
      display: flex
      margin-left: 15px
  .textarea
    background-color: #FFF
    padding: 1.2rem .7rem .7rem
    border: 1px solid #e6e6e7
    border-radius: .33rem
    &:hover
      border: 1px solid #bcbcbe
    &:focus
      border: 1px solid rgba(81, 203, 281)

.base-input
  display: flex
  flex-direction: column
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

  &-notification
    display: block
    visibility: hidden
    height: 100%
    margin: 6px 0 0
    border-radius: 5px
    color: #fff
    background-color: #ff5050
    padding: 4px

  .textarea
    background-color: white
    border: 1px solid #d6d6d7
    &:hover
      border: 1px solid #bcbcbe
    &:focus
      border: 1px solid rgba(81, 203, 281)
    &:disabled
      background-color: #F7F7F7
      pointer-events: none
      border: 1px solid #e6e6e7 !important
      color: #9F9F9F


.base-input--invalid
  .textarea
    border: 1px solid #e30000
    &:hover
      border: 1px solid #f11212
    &:focus
      border: 1px solid #b20000

@import "custom"
</style>