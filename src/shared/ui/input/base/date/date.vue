<template>
  <div
    :class="[classNames, 'base-input', { 'base-input--invalid': isError }]"
    @click="setShow(!disabled)"
  >
    <!-- название поля -->
    <span class="base-input-title">
      <p v-if="name" class="base-input-title-name" >{{ name }}</p>
      <p v-if="required" class="base-input-title-required">*</p>
    </span>

    <!-- поле -->
    <div class="input" :class="{ disabled: disabled }">
      <p
          class="input-text"
          v-html="valueText"
      />
      <i class="input-icon">
        <IconDate
            width="1rem"
            :color="iconsColor"
        />
      </i>
    </div>

    <!-- уведомление -->
    <span
        :class="['base-input-notification', { 'base-input-notification--error': isError }]"
    >
      {{ notification?.text || '&nbsp;' }}
    </span>

  </div>

  <datePicker
    v-if="show"
    :value="localValue"
    :min="min"
    :max="max"
    :is-search="isSearch"
    :is-today="isToday"
    :is-tomorrow="isTomorrow"
    :ar-disabled="arDisabled"
    :disabled-week-days="disabledWeekDays"
    :disabled-week-end="disabledWeekEnd"
    @change="setValue"
    @close="setShow(false)"
  />

</template>

<script setup>
import datePicker from './date-picker.vue'
import { IconDate } from "@/shared/ui/icons/index.js";
import { computed, ref, toRef } from "vue";
import { normalizeDate } from "@/shared/lib/main/useDate.js";

const props = defineProps({
  id: String,
  label: String,
  type: String,
  modelValue: String,
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
  notification: Object,
  isSearch: Boolean,
  isToday: Boolean,
  isTomorrow: Boolean,
  min: {
    default: false
    // default: '2024-02-17'
  },
  max: {
    default: false
    // default: '2024-02-29'

  },
  arDisabled: {
    default: ['2024-02-15']
  },
  disabledWeekDays: {
    default: false
  },
  disabledWeekEnd: {
    default: false
  },
  value: {
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'change'])

const localValue = toRef(props, 'modelValue')
const show = ref(false)

let name = computed(() => props.label || '' )
let isError = computed(() => props.notification?.type === 'error')
let iconsColor = computed(() => {
  if (props.disabled) return '#333'
  if (!isError.value) return 'blue'
  if (isError.value) return 'red'
})

const setValue = payload => {
  let { date } = payload

  localValue.value = date
  emit('update:modelValue', date)
  emit('change', date)
}

const setShow = state => show.value = state

// const model = computed({
//   get() {
//     return props.modelValue
//   },
//   set(value) {
//     emit('update:modelValue', value)
//   }
// })

const classNames = computed(() => ({
  focus: show.value
}))

const valueText = computed(() => normalizeDate({ date: localValue.value, separate: '-' }) || 'дд.мм.гггг')

</script>

<style scoped lang="sass">
.input
  display: flex
  justify-content: space-between
  align-items: center
  background-color: #FFF
  padding: .7rem
  border: 1px solid #e6e6e7
  border-radius: .33rem
  cursor: text
  &:hover
    border: 1px solid #bcbcbe
  &.focus
    border: 1px solid rgba(81, 203, 281)
  &.disabled
    background-color: #F7F7F7
    pointer-events: none
    opacity: 50%
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

  .input
    background-color: white
    border: 1px solid #d6d6d7
    &:hover
      border: 1px solid #bcbcbe
    .focus
      border: 1px solid rgba(81, 203, 281)

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
  .input
    border: 1px solid #e30000
    &:hover
      border: 1px solid #f11212
    &:focus
      border: 1px solid #b20000

@import 'custom'
</style>
