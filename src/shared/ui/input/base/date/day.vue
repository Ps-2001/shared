<template>
  <div
    class="day"
    :class="classNames"
    @click="emit('select', day)"
  >
    <p class="text">{{ day?.day || '' }}</p>
  </div>
</template>

<script setup>
import {computed, watchEffect} from "vue";
import {getDateMs, isDayWeekend} from "@/shared/lib/main/useDate.js";
import {DAY, HOUR} from "@/shared/config/index.js";

const props = defineProps([
  'day', 'min', 'max', 'show', 'disabled', 'disabledWeekDays', 'disabledWeekEnd',
  'current', 'select', 'navigate'
])
const emit = defineEmits(['select'])

const getDate = computed(() => `${props.day?.year}-${props.day?.month}-${props.day?.day}`)

const isDisabledWeeDays = computed(() => props.disabledWeekDays ? !isDayWeekend({ date: getDate.value }) : false)
const isDisabledWeeEnd = computed(() => props.disabledWeekEnd ? isDayWeekend({ date: getDate.value }) : false)
const isMinDate = computed(() => props.min ? getDateMs({ date: getDate.value }) < getDateMs({ date: props.min }) - DAY  : false )
const isMaxDate = computed(() => props.max ? getDateMs({ date: getDate.value }) > getDateMs({ date: props.max }) : false )

const classNames = computed(() => ({
  select: props.select.day === props.day.day && props.select.year === props.day.year && props.select.month === props.day.month,
  today: props.current,
  isWeekend: isDayWeekend({ date: getDate.value }),
  isShow: (props.show),
  isDisabled: (!props.day || props.disabled || isMinDate.value || isMaxDate.value || isDisabledWeeDays.value || isDisabledWeeEnd.value),
}))

watchEffect(() => {
  if (!classNames.value.isDisabled && classNames.value.select) emit('disabledSelect', false)
  if (classNames.value.isDisabled && classNames.value.select) emit('disabledSelect', true)
})

</script>

<style scoped lang="sass">
.day
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  width: 2.5rem
  height: 2.5rem
  .text
    z-index: 2000

.select
  position: relative
  font-weight: bold
  & > p
    color: white !important
  &:before
    position: absolute
    content: ''
    top: 0
    width: 110%
    height: 110%
    display: block
    background-color: #535bf2
    border-radius: 100%
    z-index: 0

.today > *
  color: #535bf2 !important
  font-weight: bold !important
.isWeekend > *
  color: red !important
.isShow
  visibility: hidden
.isDisabled
  opacity: .5
  cursor: default
  pointer-events: none


</style>
