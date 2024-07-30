<template>
  <DateCustom
      :id="field?.id"
      :key="field?.id"
      :label="field?.label"
      :type="field?.type"
      :placeholder="field?.placeholder"
      :disabled="field?.disabled"
      :required="field?.required"
      :notification="notificationMessage"
      :is-search="field?.specialized?.search || isSearch"
      :is-today="field?.specialized?.isToday || isToday"
      :is-tomorrow="field?.specialized?.isTomorrow || isTomorrow"
      :min="field?.specialized?.min || min"
      :max="field?.specialized?.max || max"
      :ar-disabled="field?.specialized?.arDisabled || arDisabled"
      :disabled-week-days="field?.specialized?.disabledWeekDays || disabledWeekDays"
      :disabled-week-end="field?.specialized?.disabledWeekEnd || disabledWeekEnd"
      v-model="localValue"
  />
</template>

<script setup>
import { ref, reactive, watch, watchEffect,onMounted, toRefs } from "vue";
import { DateCustom } from "@/shared/ui/input";
import { FIELDS_PATTERNS } from "@/shared/config";

const props = defineProps(['field', 'modelValue', 'isSearch', 'isToday', 'isTomorrow', 'min', 'max', 'arDisabled', 'disabledWeekDays', 'disabledWeekEnd'])
const emit = defineEmits(['setValid'])

const { field, modelValue } = toRefs(props);
const localValue = ref(modelValue.value || field.value.value);
const isValid = ref(false);
const pattern = ref(FIELDS_PATTERNS);
const defaultType = ref('date');
let notificationMessage = reactive({});

watch(modelValue, newValue => localValue.value = newValue, { deep: true })
watch(localValue, newValue => !field ? emit('update:modelValue', newValue) : field.value.value = newValue)

const validate = value => {

  if (props.field?.required && !value && !props.field?.disabled) {
    // Поле обязательно для заполнения, но пустое
    isValid.value = false;
    notificationMessage.type = 'error'
    notificationMessage.text = 'Это поле обязательно для заполнения'

  }
  else if (!props.field?.required && !value || (pattern.value[props.field?.type || defaultType] && pattern.value[props.field?.type || defaultType].test(value)) ) {
    // Поле не обязательное или заполненное, и соответствует паттерну
    isValid.value = true
    notificationMessage.type = 'success'
    notificationMessage.text = ''

  } else if (pattern.value[props.field?.type || defaultType] && !pattern.value[props.field?.type || defaultType].test(value) && !props.field?.disabled) {
    // Поле заполнено, но не соответствует паттерну
    isValid.value = false;

    props.field?.validateText
        ? (notificationMessage.type = 'error', notificationMessage.text = props.field?.validateText)
        : (notificationMessage.type = 'error', notificationMessage.text = 'поле заполнено неправильно')

  } else {
    // Поле либо не обязательно, либо заполнено правильно
    isValid.value = true
    notificationMessage.type = 'success'
    notificationMessage.text = ''

  }

  emit('setValid', { id: props.field?.id, valid: isValid.value })

}

watch(props.field, () => {
  validate(localValue.value)
}, { immediate: true })

watch(localValue, () => {
  validate(localValue.value)
}, { immediate: true })

</script>

<style scoped>

</style>