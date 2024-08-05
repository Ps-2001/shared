<template>
  <label :class="['base-input', { 'base-input--invalid': isError }]">

    <span class="base-input-title">
      <p v-if="name" class="base-input-title-name" >{{ name }}</p>
      <p v-if="required" class="base-input-title-required">*</p>
    </span>

    <input
        ref="$Input"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="internalValue"
        @input="updateValue"
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
import { onMounted, ref, toRefs, computed } from "vue";

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

// const props = defineProps(['type', 'value', 'modelValue', 'label', 'placeholder', 'error'])
const emit = defineEmits(['change'])

const $Input = ref()
const { modelValue } = toRefs(props);
const internalValue = ref(modelValue.value);
const inputValue = ref(props.value);

let name = computed(() => props.label || '' )
let isError = computed(() => props.notification?.type === 'error')

const updateValue = event => {
  inputValue.value = event.target.value
  emit('update:modelValue', internalValue.value)
}

const changeValue = event => {
  if (event.target.value !== props.modelValue) {
    emit('change')
  }
}

// const onInput = () => {
//   emit('update:modelValue', $Input.value.value)
//   emit('change', $Input.value.value)
// }
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

</style>