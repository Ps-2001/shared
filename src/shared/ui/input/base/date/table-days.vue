<template>

  <div class="days">

    <div
      class="days-name center"
      v-for="(day, num) in nameDays"
      :class="{ red: [6, 7].includes(+num) }"
    >
      {{ day.short }}
    </div>

    <Day
      class="day"
      v-for="(number, indx) in table"
      :key="indx"
      :day="{ year: navigate.year, month: navigate.month, day: number }"
      :min="min"
      :max="max"
      :current="current === `${navigate?.year}-${totalNum(navigate?.month)}-${totalNum(number)}`"
      :show="number === 0 "
      :disabled="arDisabled.includes(`${number?.year}-${totalNum(number?.month)}-${totalNum(number?.day)}`)"
      :disabled-week-days="disabledWeekDays"
      :disabled-week-end="disabledWeekEnd"
      :select="select"
      :navigate="navigate"
      @select="(select) => emit('select', { ...select, method: 'change' })"
      @disabledSelect="setDisabledSelect"
    />

  </div>

</template>

<script setup>
import { computed, ref, watchEffect} from "vue";
import { nameDays, totalNum } from "@/shared/lib/useDate.js";
import Day from './day.vue'

const props = defineProps([
  'first', 'count', 'min', 'max', 'arDisabled', 'disabledWeekDays', 'disabledWeekEnd',
  'current', 'select', 'navigate'
])
const emit = defineEmits(['select', 'disabledSelect'])

const table = ref([])

const setDisabledSelect = payload => emit('disabledSelect', payload)

watchEffect(() => {
  let day = 0
  let maxItem = +props.first + +props.count
  table.value = []

  for (let i = 0; i < maxItem; i++) {

    if (i < +props.first) table.value.push(0)

    else {
      day++
      table.value.push(day)
    }

  }

})
</script>

<style scoped lang="sass">
.days
  //width: 100%
  display: grid
  grid-template: repeat(7, 1fr)/ repeat(7, 1fr)
  align-content: center
  gap: .1rem
  .day
    //height: 100%

.name
  display: flex
  justify-content: space-around
  padding: .3rem 0


</style>