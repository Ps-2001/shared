<template>
  <Input
    ref="InputElem"
    :id="field?.id"
    :key="field?.id"
    :label="field?.label"
    :type="field?.type"
    :placeholder="field?.placeholder || 'день.месяц.год'"
    :disabled="field?.disabled"
    :required="field?.required"
    :notification="notificationMessage"
    v-model="dateInput"
  />
<!--  {{ field.value }}-->
</template>

<script setup>
import {computed, reactive, ref, watch, nextTick} from 'vue';
import { Input } from "@/shared/ui/input"
import { FIELDS_PATTERNS } from "@/shared/config";
const defaultType = ref('date_text');

const props = defineProps({
  field: Object,
  modelValue: {
    type: String,
    default: ''
  },
  startDateOffset: {
    default: {
      years: 0,
      months: 0,
      days: 0,
    }
  },
  endDateOffset: {
    default: {
      years: 0,
      months: 0,
      days: 0,
    }
  },
})
const emit = defineEmits(['update:modelValue', 'setValid'])

const dateInput = computed({
  get: () => convertDateToDisplayFormat(props.modelValue),
  set: (newValue) => {
    newValue = convertDateToSubmitFormat(newValue)
    // При изменении локальной переменной dateInput, эмитируем событие 'update:modelValue'
    emit('update:modelValue', newValue)
  }
})

const InputElem = ref(null)
const isValid = ref(false)
const pattern = ref(FIELDS_PATTERNS)
let notificationMessage = reactive({})

const getStartDateOffset = computed(() => {
  const years = props?.field?.specialized?.startDateOffset?.years || props?.startDateOffset?.years || 0
  const months = props?.field?.specialized?.startDateOffset?.months || props?.startDateOffset?.months || 0
  const days = props?.field?.specialized?.startDateOffset?.days || props?.startDateOffset?.days || 0

  return { years, months, days }
})

const getEndDateOffset = computed(() => {
  const years = props?.field?.specialized?.endDateOffset?.years || props?.endDateOffset?.years || 0
  const months = props?.field?.specialized?.endDateOffset?.months || props?.endDateOffset?.months || 0
  const days = props?.field?.specialized?.endDateOffset?.days || props?.endDateOffset?.days || 0

  return { years, months, days }
})

// TODO: лпределить методы: convertDateToDisplayFormat и convertDateToSubmitFormat в shared - useDate
// Функции преобразования даты
const convertDateToDisplayFormat = (date) => {
  const isCorrectDate = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.test(date)
  if (!isCorrectDate) return date

  const [year, month, day] = date.split('-')

  return `${day}.${month}.${year}`
}

const convertDateToSubmitFormat = (date) => {
  const parts = date.match(/(?<day>\d{2})\.(?<month>\d{2})\.(?<year>\d{4})/)
  if (!parts) return date

  return `${parts?.[3]}-${parts?.[2]}-${parts?.[1]}`
}

// Функция для форматирования ввода с автоматическим добавлением дефисов
const formatInput = () => {

  let value = dateInput.value

  // Убираем все кроме цифр
  value = value.replace(/[^\d]/g, '')

  // Добавляем точки после дня (2 цифры) и месяца (2 цифры)
  if (value.length > 2) value = value.slice(0, 2) + '.' + value.slice(2);
  if (value.length > 5) value = value.slice(0, 5) + '.' + value.slice(5);

  // Обрезаем строку, если она длиннее необходимого формата
  value = value.slice(0, 10)

  // Восстанавливаем позицию курсора
  let cursorPosition = InputElem.value?.getCursorPosition()
  let delta = value.length - InputElem.value?.length()
  cursorPosition += delta


  // Обновляем значение только если оно изменилось
  if (value !== dateInput.value) {
    dateInput.value = value
    nextTick(() => {
      // Восстанавливаем позицию курсора
      if (cursorPosition) InputElem.value.setCursorPosition(cursorPosition, cursorPosition)
    })
  }
}

// Функция для валидации введенной даты
const validateDate = () => {

  const startDateOffset = getStartDateOffset.value
  const endDateOffset = getEndDateOffset.value
  const [day, month, year] = dateInput.value.split('.').map(part => parseInt(part, 10))
  const regexDateText = pattern.value[props?.field?.type || defaultType.value]


  if (props.field?.required && !props.field?.disabled) {

    if ((day && month && year) && regexDateText.test(dateInput.value)) {

      const selectDate = new Date(year, month - 1, day)
      const currentDate = new Date()
      const minDate = new Date(currentDate.getFullYear() + startDateOffset.years, currentDate.getMonth() + startDateOffset.months, currentDate.getDate() + startDateOffset.days)
      const maxDate = new Date(currentDate.getFullYear() + endDateOffset.years, currentDate.getMonth() + endDateOffset.months, currentDate.getDate() + endDateOffset.days)

      const formattedMinDate = `${String(minDate.getDate()).padStart(2, '0')}.${String(minDate.getMonth() + 1).padStart(2, '0')}.${minDate.getFullYear()}`
      const formattedMaxDate = `${String(maxDate.getDate()).padStart(2, '0')}.${String(maxDate.getMonth() + 1).padStart(2, '0')}.${maxDate.getFullYear()}`

      notificationMessage.type = 'success'
      notificationMessage.text = ''
      emit('setValid', { id: props?.field?.id, valid: true })

        if (selectDate > maxDate || selectDate < minDate) {

          if (selectDate < minDate) (notificationMessage.type = 'error', notificationMessage.text = `Минимальная дата для выбора: ${formattedMinDate}`, emit('setValid', {
            id: props?.field?.id,
            valid: false
          }))
          if (selectDate > maxDate) (notificationMessage.type = 'error', notificationMessage.text = `Максимальная дата для выбора: ${formattedMaxDate}`, emit('setValid', {
            id: props?.field?.id,
            valid: false
          }))

        } else if (selectDate.getFullYear() !== year || selectDate.getMonth() + 1 !== month || selectDate.getDate() !== day) {
          notificationMessage.type = 'error'
          notificationMessage.text = 'Некорректная дата'
          emit('setValid', {id: props?.field?.id, valid: false})

        }

      } else {
        notificationMessage.type ||= 'error'
        notificationMessage.text ||= 'Введите дату в формате: 27.05.1978'
        emit('setValid', {id: props?.field?.id, valid: false})

      }

  } else {

    notificationMessage.type = 'success'
    notificationMessage.text = ''
    emit('setValid', { id: props?.field?.id, valid: true })

  }
}

// Отслеживаем изменения dateInput и форматируем ввод
watch(dateInput, (newValue, oldValue) => {
  formatInput()
  validateDate()
}, { immediate: true })

watch(props?.field, () => {
  validateDate()
}, { immediate: true })

</script>

<style>

</style>
