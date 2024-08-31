<template>

  <teleport to="body">
    <div ref="DataPicker" class="bg" @click="emit('close')">

      <div
        v-if="Object.keys(navigate).length"
        class="calendar"
        @click.stop
      >
        <div class="header">
          <div class="header-year">{{ getSelect.year.number }}</div>
          <div class="header-date">{{ headerText }}</div>
        </div>

        <div class="body">

          <Navigate
            class="navigate"
            :navigate="getNavigation"
            :navigate-text="navigateText"
            @change="setNavigate"
          />

          <div class="days">
            <TableDays
              :first="days.first - 1"
              :count="days.count"
              :min="min"
              :max="max"
              :ar-disabled="arDisabled"
              :disabled-week-days="disabledWeekDays"
              :disabled-week-end="disabledWeekEnd"
              :current="getCurrent.date"
              :select="select"
              :navigate="navigate"
              @select="setSelect"
              @disabledSelect="payload => isDisabledSelect = payload"
            />
          </div>

          <div class="conntrolls">
            <button :disabled="isDisabledSelect" @click="setValue(value)">Установить</button>
            <button @click="setValue('')">Очистить</button>
          </div>

        </div>
      </div>

    </div>
  </teleport>

</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, computed, watch} from "vue";
import Navigate from './navigate.vue'
import TableDays from './table-days.vue'
import {
  nameDays,
  setDate,
  getDate1,
  daysInMonth,
  getWeekDay,
  nameMonths,
  totalNum,
  normalizeDate, inDate, getBasic
} from "@/shared/lib/main/useDate.js";
import { upperFirstLetter } from "@/shared/lib/main/useString.js";
import {isMobileDevice, toggleFullScreen} from "@/shared/lib/main/useDevice.js";
import {MOBILES} from "@/shared/config/index.js";

const props = defineProps(['isSearch', 'isToday', 'isTomorrow', 'min', 'max', 'arDisabled', 'disabledWeekDays', 'disabledWeekEnd', 'value'])
const emit = defineEmits(['change', 'close'])

const DataPicker = ref()
const isDisabledSelect = ref(false)

const current = reactive({})
const setCurrent = payload => {
  let { year, month, day } = payload

  const data = {
    year: +year,
    month: +month,
    day: +day
  }

  current.year = data.year
  current.month = data.month
  current.day = data.day
  current.CountDay = getWeekDay({ year: current.year, month: current.month, day: data.day })
}

let select = reactive({
  // year: 2020,
  // month: 4,
  // day: 18
})
const setSelect = payload => {
  let { year, month, day } = payload

  const data = {
    year: +year,
    month: +month,
    day: +day
  }

  select.year = data.year
  select.month = data.month
  select.day = data.day
  select.CountDay = getWeekDay({ year: select.year, month: select.month, day: data.day })

}

const navigate = reactive({})
const setNavigate = payload => {
  let { year, month } = payload

  const data = {
    year: +year,
    month: +month,
  }

  navigate.year = data.year
  navigate.month = data.month
}

const days = reactive({
  // first: 3,
  // count: 30
})

const value = computed(() => `${select.year}-${totalNum(select.month)}-${totalNum(select.day) }`)

const headerText = computed(() => `${upperFirstLetter(getSelect.value.month.short)}, ${upperFirstLetter(getSelect.value.day.short)}. ${getSelect.value.day.number}`)
const navigateText = computed(() => `${getNavigation.value.month.name} ${getNavigation.value.year.number}`)

const getCurrent = computed(() => ({
  year: { number: +current.year },
  month: { number: +current.month, name: nameMonths[+current.month].name, short: nameMonths[+current.month].short },
  day: { number: +current.day, count: current.CountDay, name: nameDays[+current.CountDay].name, short: nameDays[+current.CountDay].short },

  date: `${current.year}-${totalNum(current.month)}-${totalNum(current.day)}`
}))

const getSelect = computed(() => ({
    year: { number: +select.year },
    month: { number: +select.month, name: nameMonths[+select.month].name, short: nameMonths[+select.month].short },
    day: { number: +select.day, count: +select.CountDay, name: nameDays[+select.CountDay].name, short: nameDays[+select.CountDay].short },

    date: `${select.year}-${totalNum(select.month)}-${totalNum(select.day)}`
}))

const getNavigation = computed(() => ({
  year: { number: +navigate.year },
  month: { number: +navigate.month, name: nameMonths[+navigate.month].name, short: nameMonths[+navigate.month].short },

  date: `${navigate.year}-${totalNum(navigate.month)}`
}))

let min = computed(() => {

  if (props.isToday) return getBasic()
  if (props.isTomorrow) return getBasic(setDate({ day: 1 }))
  return props.min

})
//let max = computed(() => )

watch(navigate, (current, prew) => {
  days.count = daysInMonth({ month: navigate.month, year: navigate.year})
  days.first = getWeekDay({ year: navigate.year, month: navigate.month })

}, )

watch(select, (current, prew) => {

})

watch(value, (current, prew) => {
  // emit('change', { date: current })
})

const setValue = value => {
  emit('change', { date: value })
  emit('close')
}

onMounted(() => {
  const SelectDate = props.value

  setCurrent(getDate1({ date: false }))
  setSelect(getDate1({ date: SelectDate }))
  setNavigate(getDate1({ date: SelectDate }))

  const isMobile = isMobileDevice()
  isMobile ? toggleFullScreen({ state: true }) : toggleFullScreen({ state: false })
})

onUnmounted(() => toggleFullScreen({ state: false }))

</script>

<style scoped lang="sass">
.bg
  position: fixed
  display: flex
  justify-content: center
  align-items: center
  background-color: rgba(0, 0, 0, .3)
  width: 100svw
  height: 100svh
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 3000

.calendar
  display: block
  background-color: white
  margin: auto
  width: 30lvw
  max-height: 90lvh
  border-radius: 2px
  .header
    background-color: #535bf2
    border-radius: 2px 2px 0 0
    padding: 1rem 1.8rem
    color: #FFFFFF
    &-year
      margin-bottom: .5rem

  .body
    border-radius: 0 0 2px 2px
    background-color: white
    overflow: hidden
    .navigate
      //height: 20%
    .days
      padding: 0 .7rem
      transition: height .3s ease-in-out

    .conntrolls
      display: flex
      justify-content: center
      padding: 0.8rem 0.7rem 1.6rem
      & > button
        margin-right: 1.4rem

.red
  color: red !important


/* Large Devices, Wide Screens */
@media only screen and (max-width: 1200px)
  .calendar
    font-size: 20px

/* Medium Devices, Desktops */
@media only screen and (max-width: 992px) and (max-width: 1200px)
  .calendar
    font-size: 16px

/* Small Devices, Tablets */
@media only screen and (max-width: 768px) and (max-width: 992px)
  .calendar
    display: flex
    font-size: 14px
    width: 80dvw


/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px)and (max-width: 768px)
  .calendar
    display: block
    font-size: 12px
    width: 80dvw

/* Custom, iPhone Retina */
@media only screen and (max-width: 320px) and (max-width: 480px)
  .calendar
    display: block
    font-size: 8px
    width: 80dvw
</style>
