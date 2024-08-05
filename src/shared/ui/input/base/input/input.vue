<template>
  <label :class="['base-input', { 'base-input--invalid': isError }]">
    <span class="base-input-title">
      <p v-if="name" class="base-input-title-name">{{ name }}</p>
      <p v-if="required" class="base-input-title-required">*</p>
    </span>

    <input
        ref="Input"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="internalValue"
        @change="changeValue"
    />

    <span
        :class="['base-input-notification', { 'base-input-notification--error': isError , 'visible': notification?.text }]"
    >
      {{ notification?.text || '&nbsp;' }}
    </span>
  </label>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  id: String,
  label: String,
  type: String,
  modelValue: String,
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
  notification: Object,
});

const emit = defineEmits(['update:modelValue', 'input', 'change'])

const Input = ref(null)
const internalValue = ref(props.modelValue);

let name = computed(() => props.label || '')
let isError = computed(() => props.notification?.type === 'error')

const focus = () => Input.value.focus()

const getCursorPosition = () => Input.value?.selectionStart || 0

const setCursorPosition = (starPosition, endPostion) => {

  const input = Input.value

  if (!input) return

  focus()
  Input.value.setSelectionRange(starPosition, endPostion)

}

const length = () => Input.value?.value?.length || 0

// Следим за изменениями внешнего значения и обновляем внутреннее значение
watch(() => props.modelValue, (newVal) => {
  if (newVal !== internalValue.value) internalValue.value = newVal;

})

// Следим за изменениями внутреннего значения и уведомляем родительский компонент
watch(internalValue, newValue => {
  emit('input')
  emit('update:modelValue', newValue)
})

const changeValue = () => {
  emit('change', internalValue.value);
}

defineExpose({
  focus,
  getCursorPosition,
  setCursorPosition,
  length,
})

</script>

<style scoped lang="sass">

input
  padding: .7rem
  border-radius: .33rem
  &:hover
  &:focus
  &:disabled
    background-color: #F7F7F7
    pointer-events: none
    border: 1px solid #e6e6e7 !important
    color: #9F9F9F

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
